"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.NoContent = exports.Created = exports.Ok = void 0;
function Ok(res, data) {
    return res.status(200).json(data);
}
exports.Ok = Ok;
function Created(res, data) {
    return res.status(201).json(data);
}
exports.Created = Created;
function NoContent(res) {
    res.status(204).end();
}
exports.NoContent = NoContent;
function Message(res, title, message, status) {
    return res.status(status).json({ title, message });
}
exports.Message = Message;
//# sourceMappingURL=express.utils.js.map