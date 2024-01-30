import { check, body } from 'express-validator';
import { validatorMiddleware } from '../middlewares/validatorMiddleware';

export const createItemValidator:any = [
    check('name')
    .notEmpty()
    .withMessage('Item required')
    .isLength({ min: 3 })
    .withMessage('Too short Item name'),

    check('weight')
    .notEmpty()
    .withMessage('Weight required'),

    validatorMiddleware
]

export const getItemValidator:any = [
    check('id').isMongoId().withMessage('Invalid Item id format'),
  
    validatorMiddleware
  ];