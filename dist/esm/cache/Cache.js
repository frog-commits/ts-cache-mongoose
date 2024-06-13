import ms from 'ms';
import MemoryCacheEngine from './engine/MemoryCacheEngine.js';
import RedisCacheEngine from './engine/RedisCacheEngine.js';
class CacheEngine {
    constructor(cacheOptions) {
        this.engines = ['memory', 'redis'];
        if (!this.engines.includes(cacheOptions.engine)) {
            throw new Error(`Invalid engine name: ${cacheOptions.engine}`);
        }
        if (cacheOptions.engine === 'redis' && !cacheOptions.engineOptions) {
            throw new Error(`Engine options are required for ${cacheOptions.engine} engine`);
        }
        this.defaultTTL = ms(cacheOptions.defaultTTL ?? '1 minute');
        if (cacheOptions.engine === 'redis' && cacheOptions.engineOptions) {
            this.engine = new RedisCacheEngine(cacheOptions.engineOptions);
        }
        if (cacheOptions.engine === 'memory') {
            this.engine = new MemoryCacheEngine();
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
        const actualTTL = ttl ? ms(ttl) : this.defaultTTL;
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
export default CacheEngine;
//# sourceMappingURL=Cache.js.map