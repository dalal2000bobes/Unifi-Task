"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mover = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const moverSchema = new mongoose_1.default.Schema({
    weightLimit: {
        type: Number,
        required: [true, 'weight limit required'],
    },
    energy: {
        type: Number,
        required: [true, 'Energy required'],
    },
    questState: {
        type: String,
        enum: ['resting', 'loading', 'on a mission', 'done'],
        default: 'resting',
        required: [true, 'quest state required'],
    },
}, { timestamps: true });
exports.Mover = mongoose_1.default.model('MagicMover', moverSchema);
