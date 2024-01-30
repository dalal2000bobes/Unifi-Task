"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateState = exports.store = exports.showMove = void 0;
const magicMoverModel_1 = require("../models/magicMoverModel");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.showMove = (0, express_async_handler_1.default)(async (req, res, next) => {
    let moverID = req.body.idMover;
    const document = await magicMoverModel_1.Mover.findById(moverID);
    if (!document) {
        res.status(404).json({
            massage: `No document for this id ${moverID}`,
            status: 404,
            done: false,
        });
        return;
    }
    req.body.mover = document;
    console.log(req.body);
    next();
});
exports.store = (0, express_async_handler_1.default)(async (req, res, next) => {
    let moverInfo = await new magicMoverModel_1.Mover({
        weightLimit: req.body.weightLimit,
        energy: req.body.energy,
        questState: req.body.questState,
    });
    const document = await moverInfo.save();
    if (!document) {
        res.status(400).json({
            massage: `An Error Catched when Added mover`,
            status: 400,
            done: false,
        });
        return;
    }
    res.status(201).json({
        data: document,
        status: 201,
        done: true,
    });
});
async function updateState(stateMover, moverID, res) {
    const document = await magicMoverModel_1.Mover.findByIdAndUpdate(moverID, {
        questState: stateMover,
    }, {
        new: true,
    });
    if (!document) {
        res.status(404).json({
            massage: `No document for this id ${moverID}`,
            status: 404,
            done: false,
        });
        return;
    }
    return;
}
exports.updateState = updateState;
;
