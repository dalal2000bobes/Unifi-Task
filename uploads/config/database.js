"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function dbConnection() {
    mongoose_1.default
        .connect(process.env.DB_URI)
        .then((conn) => {
        console.log(`Database Connected: ${conn.connection.host}`);
    })
        .catch((err) => {
        console.error(`Database Error: ${err}`);
        process.exit(1);
    });
}
exports.dbConnection = dbConnection;
;
