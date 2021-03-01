"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchReduce = exports.union = exports.matchValues = exports.toArray = exports.toIterator = exports.randomNum = void 0;
function randomNum(min, max) {
    return Math.random() * (max - min) + min;
}
exports.randomNum = randomNum;
function* toIterator(data) {
    let current = data.next();
    while (current.done === false) {
        yield current.value;
        current = data.next();
    }
}
exports.toIterator = toIterator;
function toArray(data) {
    const result = [];
    let current = data.next();
    while (current.done === false) {
        result.push(current.value);
        current = data.next();
    }
    return result;
}
exports.toArray = toArray;
function matchValues(target, check) {
    for (const key of Object.keys(check)) {
        if (target[key] !== undefined && target[key] !== check[key]) {
            return false;
        }
    }
    return true;
}
exports.matchValues = matchValues;
function union(...items) {
    if (items.length < 2) {
        throw new Error("union is not necesary, require more than one source");
    }
    return {
        *[Symbol.iterator]() {
            for (let index = 0; index < items.length; index++) {
                const element = items[index];
                for (const current of element) {
                    yield current;
                }
            }
        }
    };
}
exports.union = union;
function switchReduce(initial, _default, func) {
    let currentContext = initial;
    let result = _default;
    let again;
    do {
        again = false;
        func.call(null, currentContext, newCtx => {
            currentContext = newCtx;
            again = true;
        }, value => {
            result = value;
        });
    } while (again);
    return result;
}
exports.switchReduce = switchReduce;
//# sourceMappingURL=helpers.js.map