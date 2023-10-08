import { Router } from "express";
import { container } from "tsyringe";
import * as courseControllerRequestValidation from "../../../application/validations/courseControllerRequestValidation";
import CourseController from "../../controllers/courseController";

export default async (): Promise<Router> => {
  const router = Router();
  const courseController = container.resolve(CourseController);

  router.use("/v1/courses", router);
  router.post(
    "",
    courseControllerRequestValidation.saveCourseRequestValidation,
    courseController.save
  );
  router.get("", courseController.find);
  router.put(
    "/:id",
    courseControllerRequestValidation.updateCourseRequestValidation,
    courseController.update
  );
  router.delete(
    "/:id",
    courseControllerRequestValidation.deleteCourseRequestValidation,
    courseController.delete
  );
  return router;
};
