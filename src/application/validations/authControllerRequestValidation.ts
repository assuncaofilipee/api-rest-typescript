import { ValidationChain, check } from "express-validator";

const loginRequestValidations: ValidationChain[] = [
  check("login").notEmpty().withMessage("Property 'login' must not be empty"),
  check("password")
    .notEmpty()
    .withMessage("Property 'password' must not be empty"),
];

export { loginRequestValidations };
