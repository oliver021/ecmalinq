"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractiveQuery = void 0;
class InteractiveQuery {
    constructor(_source) {
        this.source = _source;
    }
    static from(source) {
        return new InteractiveQuery(source[Symbol.iterator]());
    }
    fetch() {
        const result = this.source.next();
        if (result.done) {
            throw new Error('not has result');
        }
        return result.value;
    }
    fetchOrNull() {
        const result = this.source.next();
        if (result.done) {
            return null;
        }
        return result.value;
    }
    fetchOrDefaukt(_def) {
        const result = this.source.next();
        if (result.done) {
            return _def;
        }
        return result.value;
    }
    *require(length) {
        for (let index = 0; index < length; index++) {
            const result = this.source.next();
            if (result.done) {
                throw new Error("not more result");
            }
            yield result;
        }
    }
    *fetchWhile(predicate) {
        let result = this.source.next();
        while (result.done === false) {
            if (predicate.call(null, result.value))
                yield result.value;
            result = this.source.next();
        }
    }
    *fetchUntil(predicate) {
        let result = this.source.next();
        while (result.done === false) {
            if (!predicate.call(null, result.value))
                yield result.value;
            result = this.source.next();
        }
    }
}
exports.InteractiveQuery = InteractiveQuery;
//# sourceMappingURL=InteractiveQuery.js.map