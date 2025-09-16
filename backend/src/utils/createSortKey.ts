// /backend/src/utils/createSortKey.ts

interface LocationFields {
  aisle: string;
  section: string;
  sectionNumber: number;
  column: string;
  row: number;
}

export function createSortKey({
  aisle,
  section,
  sectionNumber,
  column,
  row,
}: LocationFields): string {
  return `${aisle.padStart(2, "0")}-${section.padStart(2, "0")}-${String(
    sectionNumber
  ).padStart(3, "0")}-${column.padStart(2, "0")}-${String(row).padStart(
    3,
    "0"
  )}`;
}
