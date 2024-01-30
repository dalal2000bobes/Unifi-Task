"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = exports.showItem = void 0;
const magicItemModel_1 = require("../models/magicItemModel");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.showItem = (0, express_async_handler_1.default)(async (req, res, next) => {
    let idItem = req.body.idItem;
    const document = await magicItemModel_1.Item.findById(idItem);
    if (!document) {
        res.status(404).json({
            massage: `No document for this id ${idItem}`,
            status: 404,
            done: false,
        });
        return;
    }
    req.body.item = document;
    console.log(req.body);
    next();
});
exports.store = (0, express_async_handler_1.default)(async (req, res, next) => {
    let itemInfo = await new magicItemModel_1.Item({
        name: req.body.name,
        weight: req.body.weight,
    });
    const document = await itemInfo.save();
    if (!document) {
        res.status(400).json({
            massage: `An Error Catched when Added item ${req.body.name}`,
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
