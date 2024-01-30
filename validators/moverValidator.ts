import { check, body } from 'express-validator';
import { validatorMiddleware } from '../middlewares/validatorMiddleware';

export const createMoverValidator:any = [
    check('weightLimit')
    .notEmpty()
    .withMessage('Weight Limit required'),

    check('energy')
    .notEmpty()
    .withMessage('Energy required'),

    check('questState').optional(),

    validatorMiddleware
]

export const getMoverValidator:any = [
    check('id').isMongoId().withMessage('Invalid Item id format'),
  
    validatorMiddleware
  ];
