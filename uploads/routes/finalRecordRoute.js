"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.finalRecordRouter = void 0;
const express_1 = __importDefault(require("express"));
const finalRecordServices_1 = require("../services/finalRecordServices");
const finalRecordValidator_1 = require("../validators/finalRecordValidator");
const router = express_1.default.Router();
router
    .route('/')
    .get(finalRecordServices_1.listMover)
    .post(finalRecordValidator_1.createRecordValidator, finalRecordServices_1.sumWeight, finalRecordServices_1.store)
    .patch(finalRecordValidator_1.makeDoneValidaqtor, finalRecordServices_1.updateIsDone);
exports.finalRecordRouter = router;
