import { check, param, ValidationChain } from "express-validator";

const saveUserRequestValidation: ValidationChain[] = [
  check("name")
    .notEmpty()
    .isString()
    .withMessage("Property 'name' cannot be empty")
    .isLength({ max: 100 })
    .withMessage("Property 'name' accept 100 caracteres"),
  check("email")
    .notEmpty()
    .isEmail()
    .withMessage("Property 'email' must be a email")
    .isLength({ max: 100 })
    .withMessage("Property 'email' accept 100 caracteres"),
  check("password")
    .notEmpty()
    .isString()
    .withMessage("Property 'password' cannot be empty")
    .isLength({ max: 100 })
    .withMessage("Property 'password' accept 100 caracteres")
];

const updateUserRequestValidation: ValidationChain[] = [
  check("name")
    .optional()
    .isString()
    .withMessage("Property 'name' cannot be empty")
    .isLength({ max: 100 })
    .withMessage("Property 'name' accept 100 caracteres"),
  check("email")
    .optional()
    .isEmail()
    .withMessage("Property 'email' must be a email")
    .isLength({ max: 100 })
    .withMessage("Property 'email' accept 100 caracteres"),
  check("password")
    .optional()
    .isString()
    .withMessage("Property 'password' cannot be empty")
    .isLength({ max: 100 })
    .withMessage("Property 'password' accept 100 caracteres")
];

const deleteUserRequestValidation: ValidationChain[] = [
  param("id").isUUID().withMessage("Property 'id' must be UUID"),
];

export {
  saveUserRequestValidation,
  updateUserRequestValidation,
  deleteUserRequestValidation,
};
