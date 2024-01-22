import { check, param, ValidationChain } from "express-validator";

const saveVideoRequestValidation: ValidationChain[] = [
  check("title")
    .notEmpty()
    .isString()
    .withMessage("Property 'title' cannot be empty")
    .isLength({ max: 150 })
    .withMessage("Property 'title' accept 150 caracteres"),
  check("url")
    .notEmpty()
    .isString()
    .withMessage("Property 'url' cannot be empty")
    .isLength({ max: 150 })
    .withMessage("Property 'url' accept 150 caracteres"),
  check("courseId")
    .isUUID()
    .withMessage("Property 'courseId' must be UUID")
];

const updateVideoRequestValidation: ValidationChain[] = [
  check("title")
    .optional()
    .isString()
    .withMessage("Property 'title' cannot be empty")
    .isLength({ max: 150 })
    .withMessage("Property 'title' accept 150 caracteres"),
  check("url")
    .optional()
    .isString()
    .withMessage("Property 'url' cannot be empty")
    .isLength({ max: 150 })
    .withMessage("Property 'url' accept 150 caracteres"),
  param("id").isUUID().withMessage("Property 'id' must be UUID"),
];

const deleteVideoRequestValidation: ValidationChain[] = [
  param("id").isUUID().withMessage("Property 'id' must be UUID"),
];

export {
  saveVideoRequestValidation,
  updateVideoRequestValidation,
  deleteVideoRequestValidation,
};
