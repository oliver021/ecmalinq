import { Predicate } from './signtures';

/**
 * this class represent an interactive query
 * that means this query can help you to
 * fetch result by several way with smartness method's suite
 * @class
 * @description a query with state adn iterable lifecycle
 */
export class InteractiveQuery<T>{

    /**
     * @method from
     * @static
     * @param {Iterable<T>} source iterable source to initalzie an iteractive query
     */
    static from<T>(source: Iterable<T>){
        return new InteractiveQuery(source[Symbol.iterator]());
    }

    /**
     * @property {Iterator<T>} source
     * @access private
     * @description contain the Iterator source
     */
    private source: Iterator<T>;

    /**
     * @constructor
     * @param  {Iterator<T>} _source the basic source of que interactive query
     * @description set the inital state of class
     */
    constructor( _source: Iterator<T>){
        this.source = _source;
    }
    /**
     * @returns T
     */
    fetch(): T{
        const result = this.source.next();
        if(result.done){
            throw new Error('not has result');
        }
        return result.value;
    }
    /**
     * @returns T|null
     */
    fetchOrNull(): T|null{
        const result = this.source.next();
        if(result.done){
            return null;
        }
        return result.value;
    }

    /**
     * @param  {D} _def - this is the default value if not have more elements
     * @returns T
     */
    fetchOrDefaukt<D>(_def: D): T|D{
        const result = this.source.next();
        if(result.done){
            return _def;
        }
        return result.value;
    }
    /**
     * @param  {number} length - ammount of eleemnt of query
     */
    * require(length: number){
        for (let index = 0; index < length; index++) {
            const result = this.source.next();
            if(result.done){
                throw new Error("not more result");
            }
            yield result;
        }
    }
    /**
     * @param  {Predicate<T>} predicate
     */
    * fetchWhile(predicate: Predicate<T>){
        let result: IteratorResult<T, any> = this.source.next();
        while(result.done === false){
            if(predicate.call(null, result.value))
            yield result.value;
            result = this.source.next();
        }
    }
    /**
     * @param  {Predicate<T>} predicate
     */
    * fetchUntil(predicate: Predicate<T>){
        let result: IteratorResult<T, any> = this.source.next();
        while(result.done === false){
            if(!predicate.call(null, result.value))
            yield result.value;
            result = this.source.next();
        }
    }
}