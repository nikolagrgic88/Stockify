import { Router } from "express";
import * as validator from "../validators/pickingListValidators";
import * as pickingList from "../controller/pickingListController";
import { errorValidationService } from "../services/errorValidationService";
import { verifyUserToken } from "../middleware/authMiddleware";

const router = Router();
router.use(verifyUserToken);
router.post(
  "/new/combined",
  validator.validateCreateCombinedPickingList,
  errorValidationService,
  pickingList.createCombinedPickingList
);
router.post(
  "/new-list",
  validator.validateCreatePickingList,
  errorValidationService
  // pickingList.createPickingList
);

router.post(
  "/lists/single",
  // errorValidationService,
  pickingList.createSinglesPickingList
);
router.post(
  "/lists/multi",
  // errorValidationService,
  pickingList.createMultiPickingList
);

router.get("/lists/all", pickingList.getAllPickingLists);

export default router;
