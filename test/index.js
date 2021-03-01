"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const src_1 = require("../src");
const helpers_1 = require("../src/helpers");
const linq_1 = require("../src/linq");
describe('TEST the basic functions', () => {
    const fake = [
        {
            num: 3,
            data: "hello!!"
        },
        {
            num: 5,
            data: "hello"
        },
        {
            num: 1,
            data: "test"
        }
    ];
    it('1 - test where', () => {
        const query = new src_1.Queryable(fake);
        query.where(x => x.num === x.data.length);
        for (const result of query) {
            chai_1.assert.equal(result.data, "hello", "the basic filter where is not ok");
        }
    });
    it('2 - simple select and test methods "any()"', () => {
        const query2 = new src_1.Queryable(fake);
        const result = query2.select(x => x.num).where(x => x % 2 === 0);
        chai_1.assert.isFalse(result.any());
    });
    it('3 - simple select and test methods "toArray()"', () => {
        const query2 = new src_1.Queryable(fake);
        const result = query2.select(x => x.num)
            .where(x => x % 2 !== 0)
            .toArray();
        chai_1.assert.isArray(result, "toArray has problems, not return an array");
        chai_1.assert.equal(result.length, 3, "filter failed");
    });
    it('4 - test query with conditional filters and test method "first"', () => {
        const query = new src_1.Queryable(fake);
        query.whereIf(true, x => x.num === 5);
        chai_1.assert.isTrue(query.any(), "failed conditional filters");
        chai_1.assert.equal(query.first().data, "hello", "problems with method 'first'");
    });
    it('5 - test method "last" and "reverse"', () => {
        const query = new src_1.Queryable(fake);
        chai_1.assert.equal(query.last().data, "test", "problems with method 'last'");
        query.reverse();
        chai_1.assert.equal(query.first().data, "test", "problems with method 'last'");
    });
    it('6 - test method: "poll"', () => {
        const query = new src_1.Queryable(fake);
        const result = query.poll(x => x.num);
        chai_1.assert.equal(result.data, "hello");
    });
    it('7 - test method: "fork"', () => {
        const query = new src_1.Queryable(fake);
        const query2 = query.create((parent, next) => {
            for (const data of parent) {
                next(data);
                return;
            }
        });
        chai_1.assert.equal(query2.count(), 1);
        chai_1.assert.equal(query2.first().num, 3);
    });
    it('8 - test method: "skipWhile"', () => {
        const query = new src_1.Queryable(fake);
        query.skipWhile(() => true);
        chai_1.assert.equal(query.count(), 0, "fail test method: 'skipWhile'");
    });
    it('9 - test limit and offset', () => {
        const query = new src_1.Queryable(fake);
        query.skip(1);
        query.take(1);
        chai_1.assert.equal(query.count(), 1, "fail test limit or offset in length");
        chai_1.assert.equal(query.first().data, "hello", "fail test limit or offset in element");
    });
    it('final test form basic methods', () => {
        fInalTest(fake);
    });
});
describe('most advanced tests', () => {
    const bigObject = [
        {
            num: 45,
            data: "a"
        },
        {
            num: 91,
            data: "best!!"
        },
        {
            num: 1,
            data: "so great",
            support: true,
            num2: 1
        },
        {
            num: 2,
            data: "wrap",
            "issue": "x"
        },
        {
            num: 2,
            data: null,
            "issue": "is null"
        }
    ];
    it('10 - test order by', () => {
        const query = new src_1.Queryable(bigObject);
        query.orderBy(x => x.num);
        chai_1.assert.equal(query.first().data, "so great", "fail order by");
    });
    it('11 - test order by (descending)', () => {
        const query = new src_1.Queryable(bigObject);
        query.orderByDescending(x => x.num);
        chai_1.assert.equal(query.first().data, "best!!", "fail order by");
    });
    it('12 - test helper filter: "isNull"', () => {
        const query = new src_1.Queryable(bigObject);
        query.isNull(x => x.data);
        chai_1.assert.equal(query.count(), 1, "fail filter is null");
        chai_1.assert.equal(query.first().issue, "is null", "fail filter is null");
    });
    it('13 - test helper filter: "notNull" and method "all"', () => {
        const query = new src_1.Queryable(bigObject);
        query.notNull(x => x.num);
        chai_1.assert.isTrue(query.all(), "fail not Null or all()");
        query.isNull(x => x.data);
        chai_1.assert.isFalse(query.all(), "fail all()");
    });
    it('14 - test helper filter: "toBeRange"', () => {
        const query = new src_1.Queryable(bigObject);
        query.toBe(x => x.num, [0, 1, 221, 56, 2]);
        chai_1.assert.equal(query.count(), 3);
    });
    it('15 - test helper filter: "between"', () => {
        const query = new src_1.Queryable(bigObject);
        query.between(x => x.num, 2, 45);
        chai_1.assert.equal(query.count(), 3);
    });
    it('16 - test helper filter: "between" without inclusive case', () => {
        const query = new src_1.Queryable(bigObject);
        query.between(x => x.num, 2, 45, false);
        chai_1.assert.equal(query.count(), 0);
    });
    it('17 - test exact asserts', () => {
        const query = new src_1.Queryable(bigObject);
        query.exact({
            data: "ss",
            "num": 1
        });
        chai_1.assert.isFalse(query.any(), "expected false");
        const query2 = new src_1.Queryable(bigObject);
        query2.exact({
            data: "so great",
            num: 1,
            support: true,
            num2: 1
        });
        chai_1.assert.isTrue(query2.any(), "expected true");
    });
    it('18 - test helper filter: "exclude', () => {
        const query2 = new src_1.Queryable(bigObject);
        query2.exlude({
            data: "so great",
            num: 1,
            support: true,
            num2: 1
        });
        chai_1.assert.equal(query2.count(), 4, "expected four length");
    });
    it('19 - test helper filter: "match"', () => {
        const query = new src_1.Queryable(bigObject);
        query.match({
            num: 2,
        });
        chai_1.assert.equal(query.count(), 2, "test length by 'match' filter helper #1");
        const query2 = new src_1.Queryable(bigObject);
        query2.match({
            num: 1
        });
        chai_1.assert.equal(query2.count(), 1, "test length by 'match' filter helper #2");
        const query3 = new src_1.Queryable(bigObject);
        query3.match({
            num: 2,
            data: "support"
        });
        chai_1.assert.equal(query3.count(), 0, "test length by 'match' filter helper #3");
    });
    it('20 - test helper filter: "match" with complex case', () => {
        const query = new src_1.Queryable(bigObject);
        query.match({
            num: 2,
        });
        query.match({
            data: "wrap"
        });
        chai_1.assert.equal(query.count(), 1, "test length by 'match' filter helper, equal to 1");
    });
    it('21 - test helper filter: "not"', () => {
        const query = new src_1.Queryable(bigObject);
        query.not({
            num: 2,
        });
        query.not({
            data: "wrap"
        });
        chai_1.assert.equal(query.count(), 3, "test length by 'match' filter helper, equal to 1");
    });
    it('22 - test helper filter: "toBeRange"', () => {
        const query = new src_1.Queryable(bigObject);
        const result = query.toArrayColumn(x => x.num);
        chai_1.assert.isArray(result);
        chai_1.assert.equal(result.length, 5);
        chai_1.assert.isTrue(result.includes(91));
    });
    it('23 - test method: "agregate"', () => {
        const query = new src_1.Queryable(bigObject);
        const result = query.agregate((x, s) => {
            return s + x.num;
        }, 0);
        chai_1.assert.isNumber(result);
    });
    it('24 - test method: "create"', () => {
        const query = new src_1.Queryable(bigObject);
        const newQuery = query.create((collection, next) => {
            for (const current of collection) {
                if ((current.num % 2) === 0) {
                    next(current.data);
                }
            }
        });
        chai_1.assert.isString(newQuery.first());
        chai_1.assert.equal(newQuery.count(), 2);
    });
    it('25 - test helper: "exported"', () => {
        const query = new src_1.Queryable(bigObject);
        const queryExported = query.export();
        query.where(x => false);
        chai_1.assert.isTrue(queryExported.any());
    });
    it('26 - test helper: "toJson"', () => {
        const query = new src_1.Queryable(bigObject);
        chai_1.assert.isString(query.toJson());
    });
    it('27 - test method: "toSet"', () => {
        const query = new src_1.Queryable(bigObject);
        chai_1.assert.isTrue(query.toSet() instanceof Set);
    });
    it('28 - test helper filter: "toBeOut"', () => {
        const query = new src_1.Queryable(bigObject);
        query.toBeOut(x => x.num, [11110, 7, 331, 66, 8, 91]);
        chai_1.assert.equal(query.count(), 4);
    });
    it('29 - test helper linq: "create"', () => {
        const query = linq_1.create(next => {
            next(1);
            next(5);
            next(14);
        });
        chai_1.assert.equal(query.count(), 3);
        chai_1.assert.equal(query.last(), 14);
        chai_1.assert.equal(query.first(), 1);
        chai_1.assert.equal(query.skip(1).first(), 5);
    });
    it('30 - test helper linq: "union"', () => {
        const result = src_1.from(linq_1.range(2, 9)).count();
        chai_1.assert.equal(result, 8);
    });
    it('31 - test helper: "union"', () => {
        chai_1.assert.equal(Array.from(helpers_1.union([2], [3])).length, 2);
    });
    it('32 - test helper filter: "concat"', () => {
        const query = new src_1.Queryable(bigObject);
        const result = query.concat([{
                data: "2",
                num: 1
            }]).count();
        chai_1.assert.equal(result, 6);
    });
    it('33 - test helper: "append"', () => {
        const query = new src_1.Queryable(bigObject);
        const result = query.append([{
                data: "2!!",
                num: 1
            }]).first().data;
        chai_1.assert.equal(result, "2!!");
    });
    const sortData = [
        {
            num: 11,
            data: "ss"
        },
        {
            num: 10,
            data: "c"
        },
        {
            num: 10,
            data: "a"
        },
        {
            num: 10,
            data: "d"
        }
    ];
    it('34 - test sorting complex: #1', () => {
        const query = new src_1.Queryable(sortData);
        query
            .orderBy(x => x.num)
            .orderBy(x => x.data);
        const result = query.toArray();
        chai_1.assert.equal(result[0].num, 10);
        chai_1.assert.equal(result[0].data, "a");
        chai_1.assert.equal(result[1].data, "c");
        chai_1.assert.equal(result[2].data, "d");
    });
    it('35 -test sorting complex: #2', () => {
    });
    it('36 -test sorting complex: #3', () => {
    });
    it('37 -test method distinct', () => {
        const query = new src_1.Queryable(bigObject);
        query.distinct(x => x.num);
        chai_1.assert.equal(query.count(), 4);
    });
});
function fInalTest(fake) {
    const mockData = fake.concat([
        {
            data: "test1",
            num: 2
        },
        {
            data: "test-data",
            num: 2
        },
        {
            data: "test333",
            num: 3
        }
    ]);
    const rule = elm => (/^test/.test(elm.data) && elm.num === 2) || elm.num === 3;
    const result = src_1.from(mockData)
        .where(rule)
        .skipWhile(x => /^hello/.test(x.data))
        .count();
    chai_1.assert.equal(result, 3);
}
//# sourceMappingURL=index.js.map