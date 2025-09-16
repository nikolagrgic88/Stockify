

import Order, { IOrder } from "../models/orders";

 interface PickingListInput {
  fromSection: string;
  toSection: string;
  priority?: "low" | "medium" | "high";
  numberOfOrders?: number;
  sortBy: "date" | "location";
  notes?: string;
  dispatcher?: string;
  asignTo: string;
  strictZoneMatch?: boolean;
}

interface OrderWithLocations {
  order: IOrder;
  itemSortKeys: string[];
  sortSpan: number;
  minSortKey: string;
}

export async function generateOptimizedPickingList(input: PickingListInput) {
  const {
    fromSection,
    toSection,
    sortBy,
    numberOfOrders = 15,
    priority,
    strictZoneMatch = false,
  } = input;

  // 1. Fetch all orders with at least 1 item in the section range
  const allOrders = await Order.find({ orderStatus: "unassigned" })
    .populate("items.location") // Ensure you populate the location info
    .lean();

  // 2. Build a filtered + enriched list
  const enrichedOrders: OrderWithLocations[] = [];

  for (const order of allOrders) {
    const allSortKeys = order.items
      .map((item: any) => item.location?.sortKey)
      .filter(Boolean)
      .sort();

    const itemsInsideZone = allSortKeys.filter((k) =>
      isSortKeyInSection(k, fromSection, toSection)
    );

    if (
      (strictZoneMatch && itemsInsideZone.length === allSortKeys.length) ||
      (!strictZoneMatch && itemsInsideZone.length > 0)
    ) {
      enrichedOrders.push({
        order: order as IOrder,
        itemSortKeys: itemsInsideZone,
        minSortKey: itemsInsideZone[0],
        sortSpan: calculateSortSpan(itemsInsideZone),
      });
    }
  }

  // 3. Sort orders based on your criteria
  const sortedOrders = enrichedOrders.sort((a, b) => {
    if (sortBy === "date") {
      return (
        new Date(String(a.order.dateCreated)).getTime() -
        new Date(String(b.order.dateCreated)).getTime()
      );
    } else if (sortBy === "location") {
      return (
        a.sortSpan - b.sortSpan || a.minSortKey.localeCompare(b.minSortKey)
      );
    }
    return 0;
  });

  // 4. Select top N
  const selected = sortedOrders.slice(0, numberOfOrders);

  // 5. Extract full items + return
  return selected.map(({ order }) => order);
}

// Helper to compare sortKeys lexically within a section range
function isSortKeyInSection(
  sortKey: string,
  from: string,
  to: string
): boolean {
  return sortKey >= from && sortKey <= to;
}

function calculateSortSpan(sortKeys: string[]): number {
  if (sortKeys.length <= 1) return 0;
  const min = sortKeys[0];
  const max = sortKeys[sortKeys.length - 1];
  return sortKeyDistance(min, max);
}

function sortKeyDistance(a: string, b: string): number {
  // Convert to simple numbers for approximate distance
  const numA = convertSortKeyToNumber(a);
  const numB = convertSortKeyToNumber(b);
  return Math.abs(numB - numA);
}

function convertSortKeyToNumber(key: string): number {
  const [aisle, section, sectionNumber, column, row] = key.split("-");
  return (
    aisle.charCodeAt(0) * 100000000 +
    section.charCodeAt(0) * 1000000 +
    parseInt(sectionNumber) * 10000 +
    column.charCodeAt(0) * 100 +
    parseInt(row)
  );
}
