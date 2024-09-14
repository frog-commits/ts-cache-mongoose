import Cache from './cache/Cache.js';
import extendQuery from './extend/query.js';
import extendAggregate from './extend/aggregate.js';
class CacheMongoose {
    constructor() {
    }
    static init(mongoose, cacheOptions) {
        if (!this.instance) {
            this.instance = new CacheMongoose();
            this.instance.cache = new Cache(cacheOptions);
            const cache = this.instance.cache;
            extendQuery(mongoose, cache);
            extendAggregate(mongoose, cache);
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
export default CacheMongoose;
//# sourceMappingURL=plugin.js.map