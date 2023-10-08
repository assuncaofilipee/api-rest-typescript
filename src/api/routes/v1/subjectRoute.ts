import { Router } from "express";
import { container } from "tsyringe";
import * as subjectControllerRequestValidation from "../../../application/validations/subjectControllerRequestValidation";
import SubjectController from "../../controllers/subjectController";

export default async (): Promise<Router> => {
  const router = Router();
  const subjectController = container.resolve(SubjectController);

  router.use("/v1/subjects", router);
  router.post(
    "",
    subjectControllerRequestValidation.saveSubjectRequestValidation,
    subjectController.save
  );
  router.get("", subjectController.find);
  router.put(
    "/:id",
    subjectControllerRequestValidation.updateSubjectRequestValidation,
    subjectController.update
  );
  router.delete(
    "/:id",
    subjectControllerRequestValidation.deleteSubjectRequestValidation,
    subjectController.delete
  );
  return router;
};
