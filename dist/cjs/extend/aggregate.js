"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = extendQuery;
const key_1 = require("../key");
function extendQuery(mongoose, cache) {
    const mongooseExec = mongoose.Aggregate.prototype.exec;
    mongoose.Aggregate.prototype.getCacheKey = function () {
        if (this._key != null)
            return this._key;
        return (0, key_1.getKey)({
            pipeline: this.pipeline(),
        });
    };
    mongoose.Aggregate.prototype.getCacheTTL = function () {
        return this._ttl;
    };
    mongoose.Aggregate.prototype.cache = function (ttl, customKey) {
        this._ttl = ttl ?? null;
        this._key = customKey ?? null;
        return this;
    };
    mongoose.Aggregate.prototype.exec = async function (...args) {
        if (!Object.prototype.hasOwnProperty.call(this, '_ttl')) {
            return mongooseExec.apply(this, args);
        }
        const key = this.getCacheKey();
        const ttl = this.getCacheTTL();
        const resultCache = await cache.get(key).catch((err) => {
            console.error(err);
        });
        if (resultCache) {
            return resultCache;
        }
        const result = await mongooseExec.call(this);
        await cache.set(key, result, ttl).catch((err) => {
            console.error(err);
        });
        return result;
    };
}
//# sourceMappingURL=aggregate.js.map