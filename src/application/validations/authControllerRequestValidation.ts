import { ValidationChain, check } from "express-validator";

const loginRequestValidations: ValidationChain[] = [
  check("email").notEmpty().withMessage("Property 'email' must not be empty"),
  check("password")
    .notEmpty()
    .withMessage("Property 'password' must not be empty"),
];

export { loginRequestValidations };
