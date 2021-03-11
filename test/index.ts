import { assert, expect } from 'chai';
import { from, Queryable } from '../src';
import { union, randomNum, toArray } from '../src/helpers';
import { Predicate } from '../src/signtures';
import { create, createAsync, range } from '../src/linq';
import { IFixture, IFixture2, mockRelations, IRelResult } from './IFixture';

describe('TEST the basic functions', () =>{

    // the fixture test data
    const fake: IFixture[] = [
        {
            num: 3,
            data: "hello!!"
        },
        {
            num: 5,
            data:"hello"
        },
        {
            num: 1,
            data: "test"
        }
    ];

    // these are test for basic functions
    it('1 - test where', () =>{
        const query = new Queryable<IFixture>(fake);
        query.where(x => x.num === x.data.length);

        for (const result of query) {
            assert.equal(result.data, "hello", "the basic filter where is not ok");
        }
    });

    it('2 - simple select and test methods "any()"', () =>{
        const query2 = new Queryable<IFixture>(fake);

        const result = query2.select(x => x.num).where(x => x % 2 === 0);
        assert.isFalse(result.any());
    });

    it('3 - simple select and test methods "toArray()"', () =>{
        const query2 = new Queryable<IFixture>(fake);

        const result = query2.select(x => x.num)
        .where(x => x % 2 !== 0)
        .toArray();
        assert.isArray(result, "toArray has problems, not return an array");
        assert.equal(result.length, 3, "filter failed");
    });

    it('4 - test query with conditional filters and test method "first"', () =>{
        const query = new Queryable<IFixture>(fake);

        query.whereIf(true, x => x.num === 5);
        assert.isTrue(query.any(), "failed conditional filters");
        assert.equal(query.first().data, "hello", "problems with method 'first'");
    });

    it('5 - test method "last" and "reverse"', () =>{
        const query = new Queryable<IFixture>(fake);
        assert.equal(query.last().data, "test", "problems with method 'last'");
        query.reverse();
        assert.equal(query.first().data, "test", "problems with method 'last'");
    });

    it('6 - test method: "poll"', ()=>{
        const query = new Queryable<IFixture>(fake);
        const result = query.poll(x => x.num); // simple test for evaluations
        assert.isNotNull(result);
        expect((result as IFixture).data).to.equal("hello");
    });

    it('7 - test method: "fork"', ()=>{
        const query = new Queryable<IFixture>(fake);
        const query2 = query.create<IFixture>((parent, next)=>{
            for (const data of parent) {
                next(data);
                return;
            }
        });

        assert.equal(query2.count(), 1);
        assert.equal(query2.first().num, 3);
    });

    it('8 - test method: "skipWhile"', ()=>{
        const query = new Queryable<IFixture>(fake);
        query.skipWhile(() => true)

        // the result should be zero
        assert.equal(query.count(), 0, "fail test method: 'skipWhile'");
    });

    it('9 - test limit and offset', ()=>{
        const query = new Queryable<IFixture>(fake);
        query.skip(1);
        query.take(1);

        // the result should be zero
        assert.equal(query.count(), 1, "fail test limit or offset in length");
        assert.equal(query.first().data, "hello", "fail test limit or offset in element");
    });

    // pending test
    // tslint:disable-next-line: no-empty
    it('final test form basic methods', () => {
        fInalTest(fake);
    })
});

describe('most advanced tests #1', () => {
    // the fixture test data
    const bigObject: IFixture2[] = [
        {
            num: 45,
            data: "a"
        },
        {
            num: 91,
            data:"best!!"
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
            data: "null",
            "issue": "is null"
        }
    ];

    it('10 - test order by', () =>{
        const query = new Queryable<IFixture2>(bigObject);
        query.orderBy(x => x.num);
        assert.equal(query.first().data, "so great", "fail order by");
    });

    it('11 - test order by (descending)', () =>{
        const query = new Queryable<IFixture2>(bigObject);
        query.orderByDescending(x => x.num);
        assert.equal(query.first().data, "best!!", "fail order by");
    });

    it('12 - test helper filter: "isNull"', () =>{
        const query = new Queryable<IFixture2>(bigObject);
        query.isNull(x => x.data);
        // any element in data is null
        assert.equal(query.count(), 0, "fail filter is null");
        // assert.equal(query.first().issue, "is null", "fail filter is null");
    });

    it('13 - test helper filter: "notNull" and method "all"', () =>{
        const query = new Queryable<IFixture2>(bigObject);
        query.notNull(x => x.num);
        assert.isTrue(query.all(), "fail not Null or all()");
        query.isNull(x => x.data);
        assert.isFalse(query.all(),"fail all()");
    });

    it('14 - test helper filter: "toBeRange"', () =>{
        const query = new Queryable<IFixture2>(bigObject);
        query.toBe(x => x.num, [0, 1, 221, 56, 2]);
        assert.equal(query.count(), 3);
    });

    it('15 - test helper filter: "between"', () =>{
        const query = new Queryable<IFixture2>(bigObject);
        query.between(x => x.num, 2, 45);
        assert.equal(query.count(), 3);
    });

    it('16 - test helper filter: "between" without inclusive case', () =>{
        const query = new Queryable<IFixture2>(bigObject);
        query.between(x => x.num, 2, 45, false);
        assert.equal(query.count(), 0);
    });

    it('17 - test exact asserts', () =>{
        const query = new Queryable<IFixture2>(bigObject);
        query.exact({
            data: "ss",
            "num": 1
        });
        assert.isFalse(query.any(),"expected false");

        // second test assertions
        const query2 = new Queryable<IFixture2>(bigObject);
        query2.exact({
            data: "so great",
            num: 1,
            support: true,
            num2: 1
        });
        assert.isTrue(query2.any(), "expected true");
    });

    it('18 - test helper filter: "exclude', () =>{
        const query2 = new Queryable<IFixture2>(bigObject);
        query2.exlude({
            data: "so great",
            num: 1,
            support: true,
            num2: 1
        });
        assert.equal(query2.count(), 4, "expected four length");
    });

    it('19 - test helper filter: "match"', () =>{
        const query = new Queryable<IFixture2>(bigObject);
        query.match({
            num: 2,
        });

        assert.equal(query.count(), 2, "test length by 'match' filter helper #1");

        const query2 = new Queryable<IFixture2>(bigObject);
        query2.match({
            num: 1
        });

        assert.equal(query2.count(), 1, "test length by 'match' filter helper #2");

        const query3 = new Queryable<IFixture2>(bigObject);
        query3.match({
            num: 2,
            data: "support"
        });

        assert.equal(query3.count(), 0, "test length by 'match' filter helper #3");
    });

    it('20 - test helper filter: "match" with complex case', () =>{
        const query = new Queryable<IFixture2>(bigObject);
        query.match({
            num: 2,
        });
        query.match({
            data: "wrap"
        });
        assert.equal(query.count(), 1, "test length by 'match' filter helper, equal to 1");
    });

    it('21 - test helper filter: "not"', () =>{
        const query = new Queryable<IFixture2>(bigObject);
        query.not({
            num: 2,
        });
        query.not({
            data: "wrap"
        });
        assert.equal(query.count(), 3, "test length by 'match' filter helper, equal to 1");
    });

    it('22 - test helper filter: "toBeRange"', () =>{
        const query = new Queryable<IFixture2>(bigObject);
        const result = query.toArrayColumn(x => x.num);
        assert.isArray(result);
        assert.equal(result.length, 5);
        assert.isTrue(result.includes(91));
    });


    it('23 - test method: "agregate"', () =>{
        const query = new Queryable<IFixture2>(bigObject);
        const result = query.agregate((x, s) =>{
            return s + x.num;
        }, 0);
        assert.isNumber(result);
    });


    it('24 - test method: "create"', () =>{
        const query = new Queryable<IFixture2>(bigObject);
        const newQuery = query.create<string>((collection, next) =>{
            for (const current of collection) {
                if((current.num % 2) === 0){
                    next(current.data);
                }
            }
        });
        assert.isString(newQuery.first());
        assert.equal(newQuery.count(), 2);
    });

    it('25 - test helper: "exported"', () =>{
        const query = new Queryable<IFixture2>(bigObject);
        const queryExported = query.export();
        query.where(() => false); // that means any element is match
        assert.isTrue(queryExported.any());
    });

    it('26 - test helper: "toJson"', () =>{
        const query = new Queryable<IFixture2>(bigObject);
        assert.isString(query.toJson());
    });

    it('27 - test method: "toSet"', () =>{
        const query = new Queryable<IFixture2>(bigObject);
        assert.isTrue(query.toSet() instanceof Set);
    });

    it('28 - test helper filter: "toBeOut"', () =>{
        const query = new Queryable<IFixture2>(bigObject);
        query.toBeOut(x => x.num, [11110, 7, 331, 66, 8, 91]);
        assert.equal(query.count(), 4);
    });

    it('29 - test helper linq: "create"', () =>{
        const query = create(next => {
            next(1);
            next(5);
            next(14);
        });
        assert.equal(query.count(), 3);
        assert.equal(query.last(), 14);
        assert.equal(query.first(), 1);
        assert.equal(query.skip(1).first(), 5);
    });

    it('30 - test helper linq: "union"', () =>{
        const result = from(range(2,9)).count();
        assert.equal(result, 8);
    });

    it('31 - test helper: "union"', () =>{
       assert.equal(Array.from(union([2],[3])).length, 2)
    });

    it('32 - test helper filter: "concat"', () =>{
        const query = new Queryable<IFixture2>(bigObject);
        const result = query.concat([{
            data: "2",
            num: 1
        }]).count();
        assert.equal(result, 6);
    });

    it('33 - test helper: "append"', () =>{
        const query = new Queryable<IFixture2>(bigObject);
        const result = query.append([{
            data: "2!!",
            num: 1
        }]).first().data;
        assert.equal(result, "2!!");
    });

    const sortData: IFixture[] = [
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

    it('34 - test sorting complex: #1', () =>{
        const query = new Queryable(sortData);
        query
        .orderBy(x => x.num)
        .orderBy(x => x.data);

        const result = query.toArray();
        assert.equal(result[0].num, 10);
        assert.equal(result[0].data, "a");
        assert.equal(result[1].data, "c");
        assert.equal(result[2].data, "d");
    })

    it('35 -test \'create()\' helper', () =>{
        const query = create(next =>{
            next(1);
            next(1);
            next(2);
        });

        // three times the next is invoked then the count() is 3
        expect(query.count()).to.equal(3);
    });

    it('36 -test method distinct', () =>{
        const query = new Queryable(bigObject);
        query.distinct(x => x.num);
        assert.equal(query.count(), 4);
    });

    it('test extra method to cover trivial code ', () => {
        assert.throw(() =>{
            from(11 as any);
        }, Error);

        assert.throw(() =>{
            union([1,2,444]);
        }, Error);

        assert.doesNotThrow(() =>{
            for (let index = 0; index < 55; index++) {
                const totalMax = index + 60;
                const result = randomNum(2, totalMax);
                if(result < 2 || result > totalMax){
                    throw new Error();
                }
            }
        });

        assert.isArray(toArray(new Queryable(bigObject)[Symbol.iterator]()));

        
    });

    it('test async create helper', async () =>{
        const simplePromise = new Promise((res) =>{
            setTimeout(() => {
                res(2);
            }, 10);
        });
        const query = await createAsync( async next =>{
            const firstV = await simplePromise;
            next(firstV);
            next(1);
            next(2);
        });

        // three times the next is invoked then the count() is 3
        expect(query.count()).to.equal(3);
        expect(query.first()).to.equal(2);
    });
});

/**
 * @fucntion finalTest
 * @param fake fake data
 */
function fInalTest(fake: IFixture[]) {
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

    describe('most advanced tests #2', () => {
        // the fixture test data
        const relations = mockRelations();

        // simple log by console to debug results
        it('show join behavior', () => {
            const query = new Queryable(relations.a);
            const join = query.innerJoin(relations.b, (a, b) =>{
                // this is a rule to make an join operation
                return a.id === b.tag || b.tag2 === a.id
            }, (a, b)=>{
                 const resultJoin: IRelResult = {
                   id: a.id,
                   textA: a.text,
                   textB: b.text
                }
                return resultJoin;
            });

            // tslint:disable-next-line: no-console
            console.log(join.toArray());
        });
    });

    const rule: Predicate<IFixture> = elm => (/^test/.test(elm.data) && elm.num === 2) || elm.num === 3;
    const result = from(mockData)
        .where(rule)
        .skipWhile(x => /^hello/.test(x.data))
        .count();
    assert.equal(result, 3);
}
