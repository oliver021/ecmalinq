"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queryable = void 0;
const clone_1 = __importDefault(require("clone"));
const deep_equal_1 = __importDefault(require("deep-equal"));
const helpers_1 = require("./helpers");
const InteractiveQuery_1 = require("./InteractiveQuery");
class Queryable {
    constructor(_source) {
        this.whereClosures = [];
        this.ordersByValue = [];
        this.orderByCoparision = [];
        this.whereConditionClosures = [];
        this.limit = 0;
        this.offset = 0;
        this.ruleSkip = null;
        this.ruleTake = null;
        this.source = _source;
    }
    create(func) {
        const storage = [];
        func.call(null, this, element => storage.push(element));
        return new Queryable(storage);
    }
    where(evaluate) {
        this.whereClosures.push(evaluate);
        return this;
    }
    except(evaluate) {
        this.where((x, i = undefined) => !evaluate(x, i));
        return this;
    }
    notNull(evaluate) {
        this.where((x) => evaluate(x) !== null);
        return this;
    }
    isNull(evaluate) {
        this.where((x) => evaluate(x) === null);
        return this;
    }
    toBe(evaluate, range) {
        this.where(x => Array.from(range).includes(evaluate(x)));
        return this;
    }
    toBeOut(evaluate, range) {
        this.where(x => !Array.from(range).includes(evaluate(x)));
        return this;
    }
    between(evaluate, start, end, inclusive = true) {
        this.where(x => {
            const data = evaluate(x);
            return inclusive ? data >= start && end >= data : data > start && end > data;
        });
        return this;
    }
    exact(element) {
        return this.where(x => deep_equal_1.default(element, x));
    }
    not(element) {
        return this.where(x => !helpers_1.matchValues(x, element));
    }
    exlude(element) {
        return this.where(x => !deep_equal_1.default(element, x));
    }
    match(element) {
        return this.where(x => helpers_1.matchValues(x, element));
    }
    distinct(func) {
        const record = [];
        return this.where(x => {
            const target = func(x);
            const result = !record.includes(target);
            if (result) {
                record.push(target);
            }
            return result;
        });
    }
    join(query, on, result, _behavior) {
        const leftSrc = this;
        return new Queryable({
            *[Symbol.iterator]() {
                for (const left of leftSrc) {
                    for (const right of query) {
                        const joined = on(left, right);
                        if (!joined && _behavior === 'left') {
                            yield result.call(null, left, null);
                        }
                        else if (!joined && _behavior === 'right') {
                            yield result.call(null, null, right);
                        }
                        else if (joined) {
                            yield result.call(null, left, right);
                        }
                        else {
                            continue;
                        }
                    }
                }
            }
        });
    }
    innerJoin(query, on, result) {
        return this.join(query, on, result, "inner");
    }
    leftJoin(query, on, result) {
        return this.join(query, on, result, "left");
    }
    rightJoin(query, on, result) {
        return this.join(query, on, result, "right");
    }
    export() {
        return clone_1.default(this);
    }
    createWith(filter, builder) {
        const parent = this;
        const iterableExec = {
            *[Symbol.iterator]() {
                let state = null;
                for (const current of parent) {
                    if (filter.call(null, current)) {
                        builder(current, (arg) => state = arg);
                        if (state !== null) {
                            yield state;
                            state = null;
                        }
                    }
                }
            }
        };
        return new Queryable(iterableExec);
    }
    assertMode() {
        throw new Error('Method not implemented.');
    }
    contains(arg) {
        if (typeof arg === 'function') {
            for (const current of this) {
                return arg.call(null, current);
            }
            return false;
        }
        else {
            return false;
        }
    }
    single(predicate, _def) {
        for (const current of this) {
            if (predicate.call(null, current)) {
                return current;
            }
        }
        return null;
    }
    random() {
        const max = this.count();
        if (max === 0) {
            return null;
        }
        const limit = helpers_1.randomNum(0, max);
        const index = 0;
        for (const current of this) {
            if (index >= limit) {
                return current;
            }
        }
        return null;
    }
    cast() {
        return this;
    }
    whereIf(condition, evaluate) {
        this.whereConditionClosures.push({ _con: condition, _predi: evaluate });
        return this;
    }
    select(map) {
        this.selectClosures = map;
        return new Queryable(this);
    }
    concat(second) {
        return new Queryable(helpers_1.union(this, second));
    }
    append(second) {
        return new Queryable(helpers_1.union(second, this));
    }
    orderBy(func) {
        if (typeof func !== 'function') {
            throw new TypeError('the order by functions should be callable');
        }
        const order = func;
        if (order.lenght === 2) {
            this.orderByCoparision.push(func);
        }
        else {
            this.ordersByValue.push({ sort: func, desc: false });
        }
        return this;
    }
    orderByDescending(func) {
        this.ordersByValue.push({ sort: func, desc: true });
        return this;
    }
    groupBy(_func) {
        throw new Error('Method not implemented.');
    }
    reverse() {
        this.source = Array.from(this.applySorts(this.source)).reverse();
        return this;
    }
    agregate(func, initial) {
        let state = initial;
        for (const current of this) {
            state = func.call(null, current, state);
        }
        return state;
    }
    any() {
        for (const _ of this) {
            return true;
        }
        return false;
    }
    all() {
        return Array.from(this.source).length === this.count();
    }
    count() {
        let result = 0;
        for (const _ of this) {
            result++;
        }
        return result;
    }
    skip(count) {
        this.offset = count;
        return this;
    }
    skipWhile(skip) {
        this.ruleSkip = skip;
        return this;
    }
    take(count) {
        this.limit = count;
        return this;
    }
    takeWhile(takeCondition) {
        this.ruleTake = takeCondition;
        return this;
    }
    first() {
        for (const _ of this) {
            return _;
        }
        return null;
    }
    last() {
        let current = null;
        for (const _ of this) {
            current = _;
        }
        return current;
    }
    toArray() {
        return Array.from(this);
    }
    toArrayColumn(columnSelect) {
        const storage = [];
        for (const data of this) {
            storage.push(columnSelect(data));
        }
        return storage;
    }
    toInteractive() {
        return new InteractiveQuery_1.InteractiveQuery(this[Symbol.iterator]());
    }
    toSet() {
        return new Set(this);
    }
    toMap(mapper) {
        const map = new Map();
        for (const current of this) {
            const [key, value] = mapper(current);
            map.set(key, value);
        }
        return map;
    }
    forEach(action) {
        for (const current of this) {
            action.call(null, current);
        }
    }
    poll(evaluator, forMax = true) {
        let result = null;
        let record = 0;
        let initial = true;
        for (const current of this) {
            const evluation = evaluator(current);
            if (initial) {
                result = current;
                record = evluation;
                initial = false;
                continue;
            }
            if (forMax && evluation > record) {
                result = current;
                record = evluation;
            }
            else if (!forMax && evluation < record) {
                result = current;
                record = evluation;
            }
        }
        return result;
    }
    toJson(_idented) {
        return JSON.stringify(this.toArray());
    }
    *[Symbol.iterator]() {
        var _a, _b;
        const hasSort = this.hasSortsRule();
        const hub = [];
        let skipped = 0;
        let takeElms = 0;
        for (const current of this.source) {
            if ((this.ruleTake !== null && !((_a = this.ruleTake) === null || _a === void 0 ? void 0 : _a.call(null, current))) || (this.limit !== 0 && this.limit === takeElms)) {
                break;
            }
            if (this.ruleSkip !== null && ((_b = this.ruleSkip) === null || _b === void 0 ? void 0 : _b.call(null, current))) {
                continue;
            }
            else if (this.offset !== 0 && this.offset > skipped) {
                skipped++;
                continue;
            }
            const pass = this.applyFilters(current);
            if (!pass) {
                continue;
            }
            else {
                takeElms++;
            }
            if (hasSort) {
                if (this.selectClosures === undefined) {
                    hub.push(current);
                }
                else {
                    hub.push(this.selectClosures(current));
                }
            }
            else {
                if (this.selectClosures === undefined) {
                    yield current;
                }
                else {
                    yield this.selectClosures(current);
                }
            }
        }
        if (hasSort && hub.length > 0) {
            for (const data of this.applySorts(hub)) {
                yield data;
            }
        }
    }
    hasSortsRule() {
        return this.orderByCoparision.length > 0 || this.ordersByValue.length > 0;
    }
    applyFilters(element) {
        const filters = this.whereClosures.concat(this.whereConditionClosures
            .filter(w => w._con)
            .map(w => w._predi));
        for (let index = 0; index < filters.length; index++) {
            const where = filters[index];
            if (where(element, index)) {
                continue;
            }
            else {
                return false;
            }
        }
        return true;
    }
    applySorts(current) {
        return Array.from(current).sort((arg1, agr2) => {
            const customRules = this.orderByCoparision[Symbol.iterator]();
            let customRule = customRules.next();
            while (!customRule.done) {
                const resultOfCustomSort = customRule.value.call(null, arg1, agr2);
                if (resultOfCustomSort === 0) {
                    customRule = customRules.next();
                    continue;
                }
                else {
                    return resultOfCustomSort;
                }
            }
            const rules = this.ordersByValue[Symbol.iterator]();
            return helpers_1.switchReduce(rules.next(), 0, (ctx, reset, resolve) => {
                if (ctx.done) {
                    return;
                }
                const rule = ctx.value;
                const target1 = rule.sort(arg1);
                const target2 = rule.sort(agr2);
                if (target1 === target2) {
                    reset(rules.next());
                    return;
                }
                const result = rule.desc ? ((target1 < target2) ? 1 : -1) :
                    ((target1 > target2) ? 1 : -1);
                resolve(result);
            });
        });
    }
}
exports.Queryable = Queryable;
//# sourceMappingURL=queryable.js.map