/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
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