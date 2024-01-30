"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDoneValidaqtor = exports.createRecordValidator = void 0;
const express_validator_1 = require("express-validator");
const validatorMiddleware_1 = require("../middlewares/validatorMiddleware");
exports.createRecordValidator = [
    (0, express_validator_1.check)('idMover')
        .notEmpty()
        .withMessage('id mover required')
        .isMongoId()
        .withMessage('Invalid Item id format'),
    (0, express_validator_1.check)('weight').optional(),
    (0, express_validator_1.check)('state').optional(),
    validatorMiddleware_1.validatorMiddleware
];
exports.makeDoneValidaqtor = [
    (0, express_validator_1.check)('id')
        .isMongoId()
        .withMessage('Invalid Item id format'),
    validatorMiddleware_1.validatorMiddleware
];
