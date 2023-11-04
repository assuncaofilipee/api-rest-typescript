import { Router } from "express";
import { container } from "tsyringe";
import * as authControllerRequestValidation from "../../../application/validations/authControllerRequestValidation";
import AuthController from "../../controllers/authController";

export default async (): Promise<Router> => {
  const router = Router();
  const authController = container.resolve(AuthController);

  router.use("/v1/auth", router);
  router.post(
    "/login",
    authControllerRequestValidation.loginRequestValidations,
    authController.authenticate
  );
  
  return router;
};
