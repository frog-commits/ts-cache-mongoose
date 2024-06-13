"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ioredis_1 = tslib_1.__importDefault(require("ioredis"));
const bson_1 = require("bson");
const version_1 = require("../../version");
class RedisCacheEngine {
    constructor(options) {
        if (!options.keyPrefix) {
            options.keyPrefix = 'cache-mongoose:';
        }
        this.client = new ioredis_1.default(options);
    }
    async get(key) {
        try {
            const value = await this.client.get(key);
            if (value === null) {
                return undefined;
            }
            return bson_1.EJSON.parse(value);
        }
        catch (err) {
            console.error(err);
            return undefined;
        }
    }
    async set(key, value, ttl = Infinity) {
        try {
            const serializedValue = bson_1.EJSON.stringify((0, version_1.convertToObject)(value));
            await this.client.setex(key, Math.ceil(ttl / 1000), serializedValue);
        }
        catch (err) {
            console.error(err);
        }
    }
    async del(key) {
        await this.client.del(key);
    }
    async clear() {
        await this.client.flushdb();
    }
    async close() {
        await this.client.quit();
    }
}
exports.default = RedisCacheEngine;
//# sourceMappingURL=RedisCacheEngine.js.map