import type IData from '../interfaces/IData';
import type ICacheEngine from '../interfaces/ICacheEngine';
import type ICacheOptions from '../interfaces/ICacheOptions';
declare class CacheEngine {
    engine: ICacheEngine;
    defaultTTL: number;
    debug: boolean;
    readonly engines: readonly ["memory", "redis"];
    constructor(cacheOptions: ICacheOptions);
    get(key: string): Promise<IData>;
    set(key: string, value: IData, ttl: string | null): Promise<void>;
    del(key: string): Promise<void>;
    clear(): Promise<void>;
    close(): Promise<void>;
}
export default CacheEngine;
//# sourceMappingURL=Cache.d.ts.map