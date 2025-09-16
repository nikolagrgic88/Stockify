import axios from "axios";
import { API_MOVEMENT_URL } from "../../shared";
import { Location } from "../../locations";
import api from "../../shared/services/axiosInstance";

type MovedItem = {
  productId: string;
  quantity: number;
};

type MovementProps = {
  fromLocationId: string;
  toLocationId: string;
  items: MovedItem[];
  userId: string;
};
export type MovementResponse = {
  message: string;
  updatedLocation: Location;
  newMovement: {
    itemsMoved: MovedItem;
    fromLocationId: string;
    toLocationId: string;
    userId: string;
  };
  success: boolean;
};

export const createMovement = async ({
  fromLocationId,
  toLocationId,
  items,
  userId,
  signal,
}: MovementProps & { signal?: AbortSignal }) => {
  const url = `${API_MOVEMENT_URL}`;
  const movement = await api.post<MovementResponse>(
    url,
    { fromLocationId, toLocationId, items, userId },
    {
      withCredentials: true,
      signal,
    }
  );

  return movement.data;
};

export const fetchMovements = async ({ signal }: { signal?: AbortSignal }) => {
  const url = `${API_MOVEMENT_URL}`;
  const movements = await api.get(url, { withCredentials: true, signal });
  return movements.data;
};
