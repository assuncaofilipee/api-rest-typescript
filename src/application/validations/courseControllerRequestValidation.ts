import { check, param, ValidationChain } from "express-validator";

const saveCourseRequestValidation: ValidationChain[] = [
  check("name")
    .notEmpty()
    .isString()
    .withMessage("Property 'name' cannot be empty")
    .isLength({ max: 150 })
    .withMessage("Property 'name' accept 150 caracteres"),
  check("description")
    .notEmpty()
    .isString()
    .withMessage("Property 'name' cannot be empty")
    .isLength({ max: 250 })
    .withMessage("Property 'name' accept 250 caracteres"),
  check("subjectId")
    .isUUID()
    .withMessage("Property 'subjectId' must be UUID")
];

const updateCourseRequestValidation: ValidationChain[] = [
  check("name")
    .optional()
    .isString()
    .withMessage("Property 'name' cannot be empty")
    .isLength({ max: 150, min: 3
     })
    .withMessage("Property 'name' accept 150 caracteres"),
  check("description")
    .optional()
    .isString()
    .withMessage("Property 'name' cannot be empty")
    .isLength({ max: 250 })
    .withMessage("Property 'name' accept 250 caracteres")
];

const deleteCourseRequestValidation: ValidationChain[] = [
  param("id").isUUID().withMessage("Property 'id' must be UUID"),
];

export {
  saveCourseRequestValidation,
  updateCourseRequestValidation,
  deleteCourseRequestValidation,
};
