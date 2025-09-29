import { API_LOCATION_URL } from "../../shared";
import api from "../../shared/services/axiosInstance";

type ProductDetails = {
  id: string;
  quantity: number;
};

export type Location = {
  _id: string;
  name: string;
  aisle: string;
  section: string;
  sectionNumber: number;
  column: string;
  row: number;
  products: Array<ProductDetails>;
  index: number;
  barcode: string;
  remarks: string;
};
export type NewLocation = {
  aisle: string;
  section: string;
  sectionNumber: number;
  column: string;
  row: number;
  remarks: string;
};

type LocationResponse = {
  location: Location;
  message: string;
};
type LocationsResponse = {
  locations: Location[];
  message: string;
};

export const fetchLocation = async ({ signal }: { signal: AbortSignal }) => {
  const url = API_LOCATION_URL;
  const location = await api.get<LocationsResponse>(url, {
    withCredentials: true,
    signal,
  });


  return location.data;
};

export const fetchLocationById = async ({
  signal,
  locationId,
}: {
  signal: AbortSignal;
  locationId: string;
}) => {
  const url = `${API_LOCATION_URL}/${locationId}`;
  const location = await api.get<LocationResponse>(url, {
    withCredentials: true,
    signal,
  });
  return location;
};

export const addLocation = async ({
  signal,
  newLocationDetails,
}: {
  signal: AbortSignal;
  newLocationDetails: NewLocation;
}) => {
  const url = `${API_LOCATION_URL}/new-location`;
  const newLocation = await api.post<LocationResponse>(
    url,
    newLocationDetails,
    {
      withCredentials: true,
      signal,
    }
  );
  return newLocation.data;
};

export const deleteLocation = async ({
  signal,
  locationId,
}: {
  signal: AbortSignal;
  locationId: string;
}) => {
  const url = `${API_LOCATION_URL}/delete/${locationId}`;
  interface DeleteLocationResponse {
    message: string;
  }

  const deletedLocation = await api.delete<DeleteLocationResponse>(url, {
    withCredentials: true,
    signal,
  });

  return deletedLocation.data;
};
export const updateLocation = async ({
  locationId,
  locationData,
}: {
  locationId: string;
  locationData: Location;
}) => {
  const url = `${API_LOCATION_URL}/update/${locationId}`;
  const updatedLocation = await api.patch<LocationResponse>(url, locationData, {
    withCredentials: true,
  });

  return updatedLocation.data;
};

export const removeLocation = async (locationId: string) => {
  const controller = new AbortController();
  const deletedLocation = await deleteLocation({
    signal: controller.signal,
    locationId,
  });
  return deletedLocation;
};