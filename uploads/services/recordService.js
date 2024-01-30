"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.overFit = exports.store = void 0;
const recordModel_1 = require("../models/recordModel");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const moverServices_1 = require("./moverServices");
exports.store = (0, express_async_handler_1.default)(async (req, res, next) => {
    if (req.body.mover.questState == "on a mission") {
        res.status(200).json({
            massage: `Ooops , the mover is on a mission , choose another mover`,
            status: 200,
            done: false,
        });
        return;
    }
    console.log(req.body);
    let recordInfo = await new recordModel_1.Record({
        idMover: req.body.idMover,
        idItem: req.body.idItem,
        totalWeight: req.body.item.weight * req.body.num,
        num: req.body.num
    });
    const document = await recordInfo.save();
    if (!document) {
        res.status(400).json({
            massage: `An Error Catched when Added item`,
            status: 400,
            done: false,
        });
        return;
    }
    await (0, moverServices_1.updateState)("loading", req.body.idMover, res);
    res.status(201).json({
        data: document,
        status: 201,
        done: true,
    });
});
exports.overFit = (0, express_async_handler_1.default)(async (req, res, next) => {
    const document = await recordModel_1.Record.find({ idMover: req.body.idMover, });
    var sum = 0;
    if (!document) {
        res.status(404).json({
            massage: "No items founded",
            status: 404,
            done: false,
        });
        return;
    }
    if ((req.body.item.weight * req.body.num) > (req.body.mover.weightLimit)) {
        res.status(200).json({
            massage: `please , stop loading more `,
            overload: (req.body.item.weight * req.body.num) - (req.body.mover.weightLimit),
            status: 200,
            done: false,
        });
        return;
    }
    document.forEach((element) => {
        sum = sum + element.totalWeight;
    });
    if (sum > req.body.weightLimit) {
        res.status(200).json({
            massage: `please , stop loading more `,
            overload: sum - req.body.weightLimit,
            status: 200,
            done: false,
        });
        return;
    }
    if ((sum + (req.body.item.weight * req.body.num)) > (req.body.mover.weightLimit)) {
        res.status(200).json({
            massage: `please , stop loading more `,
            overload: (sum + (req.body.item.weight * req.body.num)) - (req.body.mover.weightLimit),
            status: 200,
            done: false,
        });
        return;
    }
    next();
});
const destroy = async (id, res) => {
    const document = await recordModel_1.Record.deleteMany({ idMover: id });
    if (!document) {
        res.status(404).json({
            massage: `No document for this id ${id}`,
            status: 404,
            done: false,
        });
        return;
    }
};
exports.destroy = destroy;
