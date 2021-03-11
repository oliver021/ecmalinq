import { from } from '../src';
import { expect, assert } from 'chai';
describe('large test about queries of the linqscript', () => {

    const data = [
        {
            support: 1,
            textMsg: "hi!!!",
            range: [1,1111,3211,11,391]
        },
        {
            support: 1,
            textMsg: "hi!!!",
            range: [1,1]
        },
        {
            support: -111,
            textMsg: "hi!!!",
            range: [3211,11,391]
        },
        {
            support: 1,
            textMsg: "hi!!!",
            range: [1,1111,3211,11,391]
        },
        {
            support: 1,
            textMsg: "hi!!!",
            range: [1,1111,3211,11,391]
        },
        {
            support: 1,
            textMsg: "hi!!!",
            range: [1,1111,3211,11,391]
        },
        {
            support: 1,
            textMsg: "hi!!!",
            range: [1,1111,3211,11,391]
        },
        {
            support: 1,
            textMsg: "hi!!!",
            range: [1,1111,3211,11,391]
        },
        {
            support: 1,
            textMsg: "hi!!!",
            range: [1,3211,11,391]
        },
        {
            support: 1,
            textMsg: "sys",
            range: [1,1111,3211,11,391]
        },
        {
            support: 1,
            textMsg: "hi!!!",
            range: []
        },
        {
            support: 1,
            textMsg: "null",
            range: [1,1,391]
        },
    ];

    it('1 - case => goal one record of seven', () =>{
        const result = from(data).poll(x => x.support, false);
        assert.isNotNull(result);
    });

    it('2 - simple exclusion', () =>{
        const result = from(data).except(x => x.support < 0);
        expect(result.count()).to.equal(data.length - 1);
        assert.isFalse(result.contains(x => x.support < 0));
        assert.isNull(result.single(x => x.support < 0));
        assert.isNotNull(result.random());
        assert.isNull(result.where(() => false).random());
    });
});