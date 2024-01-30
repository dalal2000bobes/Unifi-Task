"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Record = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const recordSchema = new mongoose_1.default.Schema({
    idMover: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, 'id mover required'],
    },
    idItem: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, 'id item required'],
    },
    totalWeight: Number,
    num: {
        type: Number,
        required: [true, 'id item required'],
    },
    state: {
        type: Boolean,
        default: false,
        required: [true, 'state required'],
    },
}, { timestamps: true });
exports.Record = mongoose_1.default.model('Record', recordSchema);
