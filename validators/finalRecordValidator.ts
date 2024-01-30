import { check, body } from 'express-validator';
import { validatorMiddleware } from '../middlewares/validatorMiddleware';

export const createRecordValidator:any = [
    check('idMover')
    .notEmpty()
    .withMessage('id mover required')
    .isMongoId()
    .withMessage('Invalid Item id format'),

    check('weight').optional(),
    
    check('state').optional(),

    validatorMiddleware
]

export const makeDoneValidaqtor:any = [
    check('id')
    .isMongoId()
    .withMessage('Invalid Item id format'),

    validatorMiddleware
]