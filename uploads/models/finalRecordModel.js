"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinalRecord = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const finalRecordSchema = new mongoose_1.default.Schema({
    idMover: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, 'id mover required'],
    },
    weight: {
        type: Number,
        required: [true, 'id item required'],
    },
    state: {
        type: String,
        enum: ['on a mission', 'done'],
        default: 'on a mission',
        required: [true, 'state required'],
    },
}, { timestamps: true });
exports.FinalRecord = mongoose_1.default.model('FinalRecord', finalRecordSchema);
