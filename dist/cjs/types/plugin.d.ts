import type { Mongoose } from 'mongoose';
import type ICacheOptions from './interfaces/ICacheOptions';
declare module 'mongoose' {
    interface Query<ResultType, DocType, THelpers, RawDocType> {
        cache: (this: Query<ResultType, DocType, THelpers, RawDocType>, ttl?: string, customKey?: string) => this;
        _key: string | null;
        getCacheKey: (this: Query<ResultType, DocType, THelpers, RawDocType>) => string;
        _ttl: string | null;
        getCacheTTL: (this: Query<ResultType, DocType, THelpers, RawDocType>) => string | null;
        op?: string;
        _path?: unknown;
        _fields?: unknown;
        _distinct?: unknown;
        _conditions?: unknown;
    }
    interface Aggregate<ResultType> {
        cache: (this: Aggregate<ResultType>, ttl?: string, customKey?: string) => this;
        _key: string | null;
        getCacheKey: (this: Aggregate<ResultType>) => string;
        _ttl: string | null;
        getCacheTTL: (this: Aggregate<ResultType>) => string | null;
    }
}
declare class CacheMongoose {
    static instance: CacheMongoose | undefined;
    private cache;
    private constructor();
    static init(mongoose: Mongoose, cacheOptions: ICacheOptions): CacheMongoose;
    clear(customKey?: string): Promise<void>;
    close(): Promise<void>;
}
export default CacheMongoose;
//# sourceMappingURL=plugin.d.ts.map