class MemoryCacheEngine {
    constructor() {
        this.cache = new Map();
    }
    get(key) {
        const item = this.cache.get(key);
        if (!item || item.expiresAt < Date.now()) {
            this.del(key);
            return undefined;
        }
        return item.value;
    }
    set(key, value, ttl = Infinity) {
        this.cache.set(key, {
            value,
            expiresAt: Date.now() + ttl,
        });
    }
    del(key) {
        this.cache.delete(key);
    }
    clear() {
        this.cache.clear();
    }
    close() {
    }
}
export default MemoryCacheEngine;
//# sourceMappingURL=MemoryCacheEngine.js.map