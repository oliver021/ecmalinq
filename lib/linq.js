"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.range = exports.from = void 0;
const queryable_1 = require("./queryable");
function from(elms) {
    if (Array.isArray(elms) || elms instanceof Set) {
        return new queryable_1.Queryable(elms);
    }
    else if (typeof elms[Symbol.iterator] === 'function') {
        return new queryable_1.Queryable(elms);
    }
    throw new Error("not was posiible resolve a query");
}
exports.from = from;
function* range(start, end, product = 1) {
    for (let index = start; index <= end; index += product) {
        yield index;
    }
}
exports.range = range;
function create(creator) {
    const storage = [];
    creator.call(null, element => storage.push(element));
    return new queryable_1.Queryable(storage);
}
exports.create = create;
//# sourceMappingURL=linq.js.map