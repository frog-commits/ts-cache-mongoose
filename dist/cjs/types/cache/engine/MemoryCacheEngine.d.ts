import type IData from '../../interfaces/IData';
import type ICacheEngine from '../../interfaces/ICacheEngine';
declare class MemoryCacheEngine implements ICacheEngine {
    cache: Map<string, {
        value: IData;
        expiresAt: number;
    } | undefined>;
    constructor();
    get(key: string): IData;
    set(key: string, value: IData, ttl?: number): void;
    del(key: string): void;
    clear(): void;
    close(): void;
}
export default MemoryCacheEngine;
//# sourceMappingURL=MemoryCacheEngine.d.ts.map