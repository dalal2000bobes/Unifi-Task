"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const itemRoute_1 = require("./routes/itemRoute");
const moverRoute_1 = require("./routes/moverRoute");
const recordRoute_1 = require("./routes/recordRoute");
const finalRecordRoute_1 = require("./routes/finalRecordRoute");
const database_1 = require("./config/database");
(0, database_1.dbConnection)();
exports.app = (0, express_1.default)();
exports.app.use((0, morgan_1.default)('dev'));
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: false }));
exports.app.use('/items', itemRoute_1.itemRouter);
exports.app.use('/movers', moverRoute_1.moverRouter);
exports.app.use('/records', recordRoute_1.recordRouter);
exports.app.use('/final/records', finalRecordRoute_1.finalRecordRouter);
exports.app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
exports.app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.send({ error: err.message });
});
