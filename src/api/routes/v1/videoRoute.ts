import { Router } from "express";
import { container } from "tsyringe";
import * as videoControllerRequestValdiation from "../../../application/validations/videoControllerRequestValidation";
import VideoController from "../../controllers/videoController";
import authMiddleware from "../../../application/middlewares/authMiddleware";

export default async (): Promise<Router> => {
  const router = Router();
  const videoController = container.resolve(VideoController);

  router.use("/v1/videos", router);
  router.post(
    "",
    authMiddleware,
    videoControllerRequestValdiation.saveVideoRequestValidation,
    videoController.save
  );
  router.get("", authMiddleware, videoController.find);
  router.put(
    "/:id",
    authMiddleware,
    videoControllerRequestValdiation.updateVideoRequestValidation,
    videoController.update
  );
  router.delete(
    "/:id",
    authMiddleware,
    videoControllerRequestValdiation.deleteVideoRequestValidation,
    videoController.delete
  );
  return router;
};
