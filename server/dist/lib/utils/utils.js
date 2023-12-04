"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function readingTime(value) {
    var _a;
    const wordsPerMinute = 200;
    const words = ((_a = value.match(/\w+/g)) === null || _a === void 0 ? void 0 : _a.length) || 0;
    const minutes = words / wordsPerMinute;
    const readTime = Math.ceil(minutes);
    return readTime;
}
exports.default = {
    readingTime,
};
//# sourceMappingURL=utils.js.map