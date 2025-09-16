const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_INVENTORY_URL = `${BASE_URL}/inventory`;
const API_LOCATION_URL = `${BASE_URL}/location`;
const API_USERS_URL = `${BASE_URL}/users`;
const API_PRODUCTS_URL = `${BASE_URL}/products`;
const API_MOVEMENT_URL = `${BASE_URL}/movement`;
const API_ORDERS_URL = `${BASE_URL}/orders`;
const API_ITEMS_URL = `${BASE_URL}/products`;
const API_PICKING_LIST_URL = `${BASE_URL}/picking-list`;
const API_DASHBOARD_PAGE_URL = `${BASE_URL}/dashboard-stats`;

export {
  API_INVENTORY_URL,
  API_LOCATION_URL,
  API_USERS_URL,
  API_PRODUCTS_URL,
  API_MOVEMENT_URL,
  BASE_URL,
  API_ITEMS_URL,
  API_ORDERS_URL,
  API_PICKING_LIST_URL,
  API_DASHBOARD_PAGE_URL,
};
