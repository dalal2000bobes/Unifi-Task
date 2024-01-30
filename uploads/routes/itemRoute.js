"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemRouter = void 0;
const express_1 = __importDefault(require("express"));
const itemServices_1 = require("../services/itemServices");
const itemValidator_1 = require("../validators/itemValidator");
const router = express_1.default.Router();
router
    .route('/')
    .post(itemValidator_1.createItemValidator, itemServices_1.store);
exports.itemRouter = router;
