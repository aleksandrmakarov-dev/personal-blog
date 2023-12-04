"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const port = process.env.PORT || 3001;
mongoose_1.default.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app_1.default.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
        console.log(`Located at: http://localhost:${port}`);
    });
});
module.exports = app_1.default;
//# sourceMappingURL=index.js.map