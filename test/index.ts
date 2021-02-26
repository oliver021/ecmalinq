import { assert } from 'chai';
import { Queryable } from '../src';

interface IFixture{
    num: number;
    data: string;
}


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
        assert.equal(result.data, "hello");
    });

    it('7 - test method: "fork"', ()=>{
        const query = new Queryable<IFixture>(fake);
        const query2 = query.fork<IFixture>((parent, next)=>{
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
        assert.equal(query.first().data, "hello!!", "fail test limit or offset in element");
    });
});