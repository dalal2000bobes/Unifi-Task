import { check, body } from 'express-validator';
import { validatorMiddleware } from '../middlewares/validatorMiddleware';

export const createRecordValidator:any= [
    check('idMover')
    .notEmpty()
    .withMessage('id mover required')
    .isMongoId()
    .withMessage('Invalid Item id format'),

    check('idItem')
    .notEmpty()
    .withMessage('id Item required')
    .isMongoId()
    .withMessage('Invalid Item id format'),

    check('num')
    .notEmpty()
    .withMessage('number of item required'),
    
    check('state').optional(),

    check('totalWeight').optional(),

    validatorMiddleware
]