import { Router } from "express";
import { container } from "tsyringe";
import * as userControllerRequestValidation from "../../../application/validations/userControllerRequestValidation";
import UserController from "../../controllers/userController";

export default async (): Promise<Router> => {
  const router = Router();
  const userController = container.resolve(UserController);

  router.use("/v1/users", router);
  router.post(
    "",
    userControllerRequestValidation.saveUserRequestValidation,
    userController.save
  );
  router.get("", userController.find);
  router.put(
    "/:id",
    userControllerRequestValidation.updateUserRequestValidation,
    userController.update
  );
  router.delete(
    "/:id",
    userControllerRequestValidation.deleteUserRequestValidation,
    userController.delete
  );
  return router;
};
