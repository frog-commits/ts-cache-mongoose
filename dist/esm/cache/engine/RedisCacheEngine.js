import IORedis from 'ioredis';
import { EJSON } from 'bson';
import { convertToObject } from '../../version.js';
class RedisCacheEngine {
    constructor(options) {
        if (!options.keyPrefix) {
            options.keyPrefix = 'cache-mongoose:';
        }
        this.client = new IORedis(options);
    }
    async get(key) {
        try {
            const value = await this.client.get(key);
            if (value === null) {
                return undefined;
            }
            return EJSON.parse(value);
        }
        catch (err) {
            console.error(err);
            return undefined;
        }
    }
    async set(key, value, ttl = Infinity) {
        try {
            const serializedValue = EJSON.stringify(convertToObject(value));
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
export default RedisCacheEngine;
//# sourceMappingURL=RedisCacheEngine.js.map