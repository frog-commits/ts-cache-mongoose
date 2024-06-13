import { createHash } from 'crypto';
import sortKeys from 'sort-keys';
export function getKey(data) {
    const sortedObj = sortKeys(data, { deep: true });
    const sortedStr = JSON.stringify(sortedObj, (_, val) => {
        return val instanceof RegExp ? String(val) : val;
    });
    return createHash('sha1').update(sortedStr).digest('hex');
}
//# sourceMappingURL=key.js.map