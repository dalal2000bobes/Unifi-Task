"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMoverValidator = exports.createMoverValidator = void 0;
const express_validator_1 = require("express-validator");
const validatorMiddleware_1 = require("../middlewares/validatorMiddleware");
exports.createMoverValidator = [
    (0, express_validator_1.check)('weightLimit')
        .notEmpty()
        .withMessage('Weight Limit required'),
    (0, express_validator_1.check)('energy')
        .notEmpty()
        .withMessage('Energy required'),
    (0, express_validator_1.check)('questState').optional(),
    validatorMiddleware_1.validatorMiddleware
];
exports.getMoverValidator = [
    (0, express_validator_1.check)('id').isMongoId().withMessage('Invalid Item id format'),
    validatorMiddleware_1.validatorMiddleware
];
