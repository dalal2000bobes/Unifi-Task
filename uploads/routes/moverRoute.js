"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moverRouter = void 0;
const express_1 = __importDefault(require("express"));
const moverServices_1 = require("../services/moverServices");
const moverValidator_1 = require("../validators/moverValidator");
const router = express_1.default.Router();
router
    .route('/')
    .post(moverValidator_1.createMoverValidator, moverServices_1.store);
exports.moverRouter = router;
