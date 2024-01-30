"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const itemSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'name required'],
    },
    weight: {
        type: Number,
        required: [true, 'weight required'],
    },
}, { timestamps: true });
exports.Item = mongoose_1.default.model('MagicItem', itemSchema);
