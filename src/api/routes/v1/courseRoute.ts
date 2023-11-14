import { Router } from "express";
import { container } from "tsyringe";
import * as courseControllerRequestValidation from "../../../application/validations/courseControllerRequestValidation";
import CourseController from "../../controllers/courseController";
import authMiddleware from "../../../application/middlewares/authMiddleware";

export default async (): Promise<Router> => {
  const router = Router();
  const courseController = container.resolve(CourseController);

  router.use("/v1/courses", router);
  router.post(
    "",
    authMiddleware,
    courseControllerRequestValidation.saveCourseRequestValidation,
    courseController.save
  );
  router.get("", authMiddleware, courseController.find);
  router.put(
    "/:id",
    authMiddleware,
    courseControllerRequestValidation.updateCourseRequestValidation,
    courseController.update
  );
  router.delete(
    "/:id",
    authMiddleware,
    courseControllerRequestValidation.deleteCourseRequestValidation,
    courseController.delete
  );
  return router;
};
