"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToObject = exports.isMongooseLessThan7 = void 0;
const tslib_1 = require("tslib");
const semver_1 = require("semver");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
exports.isMongooseLessThan7 = (0, semver_1.satisfies)(mongoose_1.default.version, '<7');
const convertToObject = (value) => {
    if (exports.isMongooseLessThan7) {
        if (value != null && typeof value === 'object' && !Array.isArray(value) && value.toObject) {
            return value.toObject();
        }
        if (Array.isArray(value)) {
            return value.map((doc) => (0, exports.convertToObject)(doc));
        }
    }
    return value;
};
exports.convertToObject = convertToObject;
//# sourceMappingURL=version.js.map