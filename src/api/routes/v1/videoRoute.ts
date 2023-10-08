import { Router } from "express";
import { container } from "tsyringe";
import * as videoControllerRequestValdiation from "../../../application/validations/videoControllerRequestValidation";
import VideoController from "../../controllers/videoController";

export default async (): Promise<Router> => {
  const router = Router();
  const videoController = container.resolve(VideoController);

  router.use("/v1/videos", router);
  router.post(
    "",
    videoControllerRequestValdiation.saveVideoRequestValidation,
    videoController.save
  );
  router.get("", videoController.find);
  router.put(
    "/:id",
    videoControllerRequestValdiation.updateVideoRequestValidation,
    videoController.update
  );
  router.delete(
    "/:id",
    videoControllerRequestValdiation.deleteVideoRequestValidation,
    videoController.delete
  );
  return router;
};
