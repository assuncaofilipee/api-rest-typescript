import { check, param, ValidationChain } from "express-validator";

const saveSubjectRequestValidation: ValidationChain[] = [
  check("name")
    .notEmpty()
    .isString()
    .withMessage("Property 'name' cannot be empty")
    .isLength({ max: 150 })
    .withMessage("Property 'name' accept 150 caracteres"),
];

const updateSubjectRequestValidation: ValidationChain[] = [
  check("name")
    .notEmpty()
    .isString()
    .withMessage("Property 'name' cannot be empty")
    .isLength({ max: 150 })
    .withMessage("Property 'name' accept 150 caracteres"),
  param("id").isUUID().notEmpty().withMessage("Property 'id' must be UUID"),
];

const deleteSubjectRequestValidation: ValidationChain[] = [
  param("id").isUUID().withMessage("Property 'id' must be UUID"),
];

export {
  saveSubjectRequestValidation,
  updateSubjectRequestValidation,
  deleteSubjectRequestValidation,
};
