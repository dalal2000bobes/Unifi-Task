"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordRouter = void 0;
const express_1 = __importDefault(require("express"));
const itemServices_1 = require("../services/itemServices");
const moverServices_1 = require("../services/moverServices");
const recordService_1 = require("../services/recordService");
const recordValidator_1 = require("../validators/recordValidator");
const router = express_1.default.Router();
router
    .route('/')
    .post(recordValidator_1.createRecordValidator, itemServices_1.showItem, moverServices_1.showMove, recordService_1.overFit, recordService_1.store);
exports.recordRouter = router;
