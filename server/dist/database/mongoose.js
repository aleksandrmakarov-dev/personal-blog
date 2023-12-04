"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const app_config_1 = __importDefault(require("../config/app.config"));
async function connectToDb() {
    mongoose_1.default.set("strictQuery", true);
    await mongoose_1.default.connect(app_config_1.default.database.uri);
}
exports.connectToDb = connectToDb;
//# sourceMappingURL=mongoose.js.map