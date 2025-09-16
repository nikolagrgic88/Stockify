const DELETE_LOCATION =
  "Are you sure you want to delete the location? Once the location has been deleted, it cannot be recovered.";
const DELETE_ITEM =
  "Are you sure you want to delete the item? Once the item has been deleted, it cannot be recovered.";

const PRIORITY_OPTIONS = ["High", "Medium", "Low"];
const DISPATCHERS = [
  "auspost",
  "startrack",
  "tollgroup",
  "couriersplease",
  "aramex",
];
const SECTION = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i)
);
const ORDER_STATUS = ["pending", "packing", "picked", "shipped", "fulfilled"];
const SORT_OPTIONS = ["date", "location"];
export {
  DELETE_ITEM,
  DELETE_LOCATION,
  PRIORITY_OPTIONS,
  DISPATCHERS,
  ORDER_STATUS,
  SORT_OPTIONS,
  SECTION,
};
