import { Router } from "express";
import * as location from "../controller/locationController";
import * as validator from "../validators/locationValidators";
import { authorize, verifyUserToken } from "../middleware/authMiddleware";

const router = Router();
router.use(verifyUserToken);
router.post(
  "/new-location",
  validator.validateNewLocation,
  location.postCreateLocation
);
router.post("/new-locations", location.createManylocations);
router.patch("/update/:locationId", location.updateLocation);
router.delete(
  "/delete/:locationId",
  authorize(["admin", "manager"]),
  location.deleteLocation
);
router.get("/:locationId", location.getLocationById);
router.get("/", location.getAllLocations);

export default router;
