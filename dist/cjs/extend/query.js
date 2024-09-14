"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = extendQuery;
const key_1 = require("../key");
function extendQuery(mongoose, cache) {
    const mongooseExec = mongoose.Query.prototype.exec;
    mongoose.Query.prototype.getCacheKey = function () {
        if (this._key != null)
            return this._key;
        const filter = this.getFilter();
        const update = this.getUpdate();
        const options = this.getOptions();
        const mongooseOptions = this.mongooseOptions();
        return (0, key_1.getKey)({
            model: this.model.modelName,
            op: this.op,
            filter,
            update,
            options,
            mongooseOptions,
            _path: this._path,
            _fields: this._fields,
            _distinct: this._distinct,
            _conditions: this._conditions,
        });
    };
    mongoose.Query.prototype.getCacheTTL = function () {
        return this._ttl;
    };
    mongoose.Query.prototype.cache = function (ttl, customKey) {
        this._ttl = ttl ?? null;
        this._key = customKey ?? null;
        return this;
    };
    mongoose.Query.prototype.exec = async function (...args) {
        if (!Object.prototype.hasOwnProperty.call(this, '_ttl')) {
            return mongooseExec.apply(this, args);
        }
        const key = this.getCacheKey();
        const ttl = this.getCacheTTL();
        const mongooseOptions = this.mongooseOptions();
        const isCount = this.op?.includes('count') ?? false;
        const isDistinct = this.op === 'distinct';
        const model = this.model.modelName;
        const resultCache = await cache.get(key).catch((err) => {
            console.error(err);
        });
        if (resultCache) {
            if (isCount || isDistinct || mongooseOptions.lean) {
                return resultCache;
            }
            const constructor = mongoose.model(model);
            if (Array.isArray(resultCache)) {
                return resultCache.map((item) => {
                    return constructor.hydrate(item);
                });
            }
            else {
                return constructor.hydrate(resultCache);
            }
        }
        const result = await mongooseExec.call(this);
        await cache.set(key, result, ttl).catch((err) => {
            console.error(err);
        });
        return result;
    };
}
//# sourceMappingURL=query.js.map