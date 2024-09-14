"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKey = getKey;
const tslib_1 = require("tslib");
const crypto_1 = require("crypto");
const sort_keys_1 = tslib_1.__importDefault(require("sort-keys"));
function getKey(data) {
    const sortedObj = (0, sort_keys_1.default)(data, { deep: true });
    const sortedStr = JSON.stringify(sortedObj, (_, val) => {
        return val instanceof RegExp ? String(val) : val;
    });
    return (0, crypto_1.createHash)('sha1').update(sortedStr).digest('hex');
}
//# sourceMappingURL=key.js.map