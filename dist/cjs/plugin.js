"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Cache_1 = tslib_1.__importDefault(require("./cache/Cache"));
const query_1 = tslib_1.__importDefault(require("./extend/query"));
const aggregate_1 = tslib_1.__importDefault(require("./extend/aggregate"));
class CacheMongoose {
    constructor() {
    }
    static init(mongoose, cacheOptions) {
        if (!this.instance) {
            this.instance = new CacheMongoose();
            this.instance.cache = new Cache_1.default(cacheOptions);
            const cache = this.instance.cache;
            (0, query_1.default)(mongoose, cache);
            (0, aggregate_1.default)(mongoose, cache);
        }
        return this.instance;
    }
    async clear(customKey) {
        if (customKey != null) {
            await this.cache.del(customKey);
        }
        else {
            await this.cache.clear();
        }
    }
    async close() {
        await this.cache.close();
    }
}
exports.default = CacheMongoose;
//# sourceMappingURL=plugin.js.map