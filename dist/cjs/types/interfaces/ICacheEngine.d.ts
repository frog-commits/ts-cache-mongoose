import type IData from './IData';
interface ICacheEngine {
    get: (key: string) => Promise<IData> | IData;
    set: (key: string, value: IData, ttl?: number) => Promise<void> | void;
    del: (key: string) => Promise<void> | void;
    clear: () => Promise<void> | void;
    close: () => Promise<void> | void;
}
export default ICacheEngine;
//# sourceMappingURL=ICacheEngine.d.ts.map