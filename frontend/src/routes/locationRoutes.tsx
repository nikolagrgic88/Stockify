import {
  FindLocationPage,
  LocationDashboardPage,
  NewLocationPage,
  LocationDetailsPage,
  inventoryLoaderById,
  updateLocationAction,
  createNewLocatioAction,
  deleteLocationAction,
} from "../locations";
import { locationLoader } from "../locations/services/loaders";
import { DeletePage, queryClient } from "../shared";
import { DELETE_LOCATION } from "../shared/constants/dialogText";

export const locationRoutes = {
  path: "location",
  element: <LocationDashboardPage />,
  children: [
    {
      path: "new-location",
      element: <NewLocationPage />,
      action: createNewLocatioAction(queryClient),
    },
    {
      path: "find-location",
      element: <FindLocationPage />,
      loader: locationLoader(queryClient),
    },
    {
      path: ":locationId/delete",
      element: <DeletePage dialogText={DELETE_LOCATION} />,
      action: deleteLocationAction,
    },
    {
      path: ":locationId/details",
      element: <LocationDetailsPage />,
      loader: inventoryLoaderById(queryClient),
      action: updateLocationAction(queryClient),
    },
  ],
};
