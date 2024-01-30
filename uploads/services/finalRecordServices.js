"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listMover = exports.updateIsDone = exports.sumWeight = exports.store = void 0;
const finalRecordModel_1 = require("../models/finalRecordModel");
const recordModel_1 = require("../models/recordModel");
const magicMoverModel_1 = require("../models/magicMoverModel");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const moverServices_1 = require("./moverServices");
const recordService_1 = require("./recordService");
exports.store = (0, express_async_handler_1.default)(async (req, res, next) => {
    console.log(req.body);
    let recordInfo = await new finalRecordModel_1.FinalRecord({
        idMover: req.body.idMover,
        weight: req.body.sum,
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
    await (0, moverServices_1.updateState)("on a mission", req.body.idMover, res);
    await (0, recordService_1.destroy)(req.body.idMover, res);
    res.status(201).json({
        data: document,
        status: 201,
        done: true,
    });
});
exports.sumWeight = (0, express_async_handler_1.default)(async (req, res, next) => {
    var sum = 0;
    const document = await recordModel_1.Record.find({ idMover: req.body.idMover });
    if (!document || (document.length == 0)) {
        res.status(404).json({
            massage: "No items founded",
            status: 404,
            done: false,
        });
        return;
    }
    console.log(document);
    document.forEach((element) => {
        sum = sum + element.totalWeight;
    });
    req.body.sum = sum;
    console.log(sum);
    next();
});
exports.updateIsDone = (0, express_async_handler_1.default)(async (req, res, next) => {
    let itemID = req.body.id;
    const document = await finalRecordModel_1.FinalRecord.findByIdAndUpdate(itemID, {
        state: "done"
    }, {
        new: true,
    });
    if (!document) {
        res.status(404).json({
            massage: `No document for this id ${itemID}`,
            status: 404,
            done: false,
        });
        return;
    }
    console.log(document);
    await (0, moverServices_1.updateState)("done", document.idMover, res);
    res.status(200).json({
        data: document,
        status: 200,
        done: true,
    });
    next();
});
exports.listMover = (0, express_async_handler_1.default)(async (req, res, next) => {
    const document = await magicMoverModel_1.Mover.find();
    if (!document) {
        res.status(404).json({
            massage: "No movers founded",
            status: 404,
            done: false,
        });
        return;
    }
    var result = [];
    console.log(document.length);
    document.forEach(async (element) => {
        const record1 = await finalRecordModel_1.FinalRecord.find({ idMover: element.id });
        const record2 = await finalRecordModel_1.FinalRecord.find({
            idMover: element.id,
            state: "on a mission"
        });
        const record3 = await finalRecordModel_1.FinalRecord.find({
            idMover: element.id,
            state: "done"
        });
        var temp = {
            idMover: element.id,
            allTasks: record1.length,
            tasksInProgress: record2.length,
            completedTasks: record3.length,
        };
        result.push(temp);
        if (result.length == document.length) {
            console.log(result);
            res.status(200).json({
                data: result,
                status: 200,
                done: true,
            });
        }
    });
});
