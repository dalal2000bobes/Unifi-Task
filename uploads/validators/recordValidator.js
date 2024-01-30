"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecordValidator = void 0;
const express_validator_1 = require("express-validator");
const validatorMiddleware_1 = require("../middlewares/validatorMiddleware");
exports.createRecordValidator = [
    (0, express_validator_1.check)('idMover')
        .notEmpty()
        .withMessage('id mover required')
        .isMongoId()
        .withMessage('Invalid Item id format'),
    (0, express_validator_1.check)('idItem')
        .notEmpty()
        .withMessage('id Item required')
        .isMongoId()
        .withMessage('Invalid Item id format'),
    (0, express_validator_1.check)('num')
        .notEmpty()
        .withMessage('number of item required'),
    (0, express_validator_1.check)('state').optional(),
    (0, express_validator_1.check)('totalWeight').optional(),
    validatorMiddleware_1.validatorMiddleware
];
