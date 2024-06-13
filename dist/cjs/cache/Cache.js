"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ms_1 = tslib_1.__importDefault(require("ms"));
const MemoryCacheEngine_1 = tslib_1.__importDefault(require("./engine/MemoryCacheEngine"));
const RedisCacheEngine_1 = tslib_1.__importDefault(require("./engine/RedisCacheEngine"));
class CacheEngine {
    constructor(cacheOptions) {
        this.engines = ['memory', 'redis'];
        if (!this.engines.includes(cacheOptions.engine)) {
            throw new Error(`Invalid engine name: ${cacheOptions.engine}`);
        }
        if (cacheOptions.engine === 'redis' && !cacheOptions.engineOptions) {
            throw new Error(`Engine options are required for ${cacheOptions.engine} engine`);
        }
        this.defaultTTL = (0, ms_1.default)(cacheOptions.defaultTTL ?? '1 minute');
        if (cacheOptions.engine === 'redis' && cacheOptions.engineOptions) {
            this.engine = new RedisCacheEngine_1.default(cacheOptions.engineOptions);
        }
        if (cacheOptions.engine === 'memory') {
            this.engine = new MemoryCacheEngine_1.default();
        }
        this.debug = cacheOptions.debug === true;
    }
    async get(key) {
        const cacheEntry = await this.engine.get(key);
        if (this.debug) {
            const cacheHit = (cacheEntry != undefined) ? 'HIT' : 'MISS';
            console.log(`[ts-cache-mongoose] GET '${key}' - ${cacheHit}`);
        }
        return cacheEntry;
    }
    async set(key, value, ttl) {
        const actualTTL = ttl ? (0, ms_1.default)(ttl) : this.defaultTTL;
        await this.engine.set(key, value, actualTTL);
        if (this.debug) {
            console.log(`[ts-cache-mongoose] SET '${key}' - ttl: ${actualTTL.toFixed(0)} ms`);
        }
    }
    async del(key) {
        await this.engine.del(key);
        if (this.debug) {
            console.log(`[ts-cache-mongoose] DEL '${key}'`);
        }
    }
    async clear() {
        await this.engine.clear();
        if (this.debug) {
            console.log(`[ts-cache-mongoose] CLEAR`);
        }
    }
    async close() {
        return this.engine.close();
    }
}
exports.default = CacheEngine;
//# sourceMappingURL=Cache.js.map