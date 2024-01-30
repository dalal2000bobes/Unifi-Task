"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemValidator = exports.createItemValidator = void 0;
const express_validator_1 = require("express-validator");
const validatorMiddleware_1 = require("../middlewares/validatorMiddleware");
exports.createItemValidator = [
    (0, express_validator_1.check)('name')
        .notEmpty()
        .withMessage('Item required')
        .isLength({ min: 3 })
        .withMessage('Too short Item name'),
    (0, express_validator_1.check)('weight')
        .notEmpty()
        .withMessage('Weight required'),
    validatorMiddleware_1.validatorMiddleware
];
exports.getItemValidator = [
    (0, express_validator_1.check)('id').isMongoId().withMessage('Invalid Item id format'),
    validatorMiddleware_1.validatorMiddleware
];
