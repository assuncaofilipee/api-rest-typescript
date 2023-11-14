import { Router } from "express";
import { container } from "tsyringe";
import * as subjectControllerRequestValidation from "../../../application/validations/subjectControllerRequestValidation";
import SubjectController from "../../controllers/subjectController";
import authMiddleware from "../../../application/middlewares/authMiddleware";

export default async (): Promise<Router> => {
  const router = Router();
  const subjectController = container.resolve(SubjectController);

  router.use("/v1/subjects", router);
  router.post(
    "",
    authMiddleware,
    subjectControllerRequestValidation.saveSubjectRequestValidation,
    subjectController.save
  );
  router.get("", authMiddleware, subjectController.find);
  router.put(
    "/:id",
    authMiddleware,
    subjectControllerRequestValidation.updateSubjectRequestValidation,
    subjectController.update
  );
  router.delete(
    "/:id",
    authMiddleware,
    subjectControllerRequestValidation.deleteSubjectRequestValidation,
    subjectController.delete
  );
  return router;
};
