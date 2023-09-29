import { check, ValidationChain } from 'express-validator';

const saveSubjectRequestValidation: ValidationChain[] = [
  check('name')
    .notEmpty()
    .isString()
    .withMessage("Property 'name' cannot be empty")
];

export {
  saveSubjectRequestValidation
};
