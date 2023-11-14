import { Router } from "express";
import { container } from "tsyringe";
import * as userControllerRequestValidation from "../../../application/validations/userControllerRequestValidation";
import UserController from "../../controllers/userController";
import authMiddleware from "../../../application/middlewares/authMiddleware";

export default async (): Promise<Router> => {
  const router = Router();
  const userController = container.resolve(UserController);

  router.use("/v1/users", router);
  router.post(
    "",
    authMiddleware,
    userControllerRequestValidation.saveUserRequestValidation,
    userController.save
  );
  router.get("", authMiddleware, userController.find);
  router.put(
    "/:id",
    authMiddleware,
    userControllerRequestValidation.updateUserRequestValidation,
    userController.update
  );
  router.delete(
    "/:id",
    authMiddleware,
    userControllerRequestValidation.deleteUserRequestValidation,
    userController.delete
  );
  return router;
};
