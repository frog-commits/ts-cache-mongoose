import type { Redis, RedisOptions } from 'ioredis';
import type IData from '../../interfaces/IData';
import type ICacheEngine from '../../interfaces/ICacheEngine';
declare class RedisCacheEngine implements ICacheEngine {
    client: Redis;
    constructor(options: RedisOptions);
    get(key: string): Promise<IData>;
    set(key: string, value: IData, ttl?: number): Promise<void>;
    del(key: string): Promise<void>;
    clear(): Promise<void>;
    close(): Promise<void>;
}
export default RedisCacheEngine;
//# sourceMappingURL=RedisCacheEngine.d.ts.map