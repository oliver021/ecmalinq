import { IAssertQueryable } from './IAsertQueryable';
import { IQueryable, QueryableDefaultReturn } from './IQueryable';
import { IQueryableGroup } from './iqueryable-group';
import {
    Predicate, PredeicateIndex, Selector,
    Rtrn, Sort, Reducer, Action, FreeFunc,
    Func
} from './signtures';
import { randomNum } from './helpers';

/**
 * This is the std implementation of IQueryable
 * this class contains all implementations necesary to make queries
 * support generic type
 * Through this class you can make clean, extensible and advanced queries
 * using the interface IQueryable
 * @class
 * @description The basic query engine class to process result of the a query
 * @see
 * @access public
 * @argument T the query element T can be primitives value or object
 */
export class Queryable<T> implements IQueryable<T>{

    /**
     * @access protected
     * @property {Iterable<T>} source
     * @description contains the source of the query
     */
    protected source: Iterable<T>;

    /**
     * @access private
     * @property {PredeicateIndex<T>[]}
     * @default {[]}
     * @description store the basic where filters
     */
    private whereClosures: PredeicateIndex<T>[] = [];

    /**
     * @access private
     * @property {PredeicateIndex<T>[]}
     * @default {[]}
     * @description store the selector fucntion that transform the query
     */
    private selectClosures!: Selector<T,any>;

    /**
     * @access private
     * @property {PredeicateIndex<T>[]}
     * @default {[]}
     */
    private ordersByValue: Rtrn<any>[] = [];

    /**
     * @access private
     * @property {PredeicateIndex<T>[]}
     * @default {[]}
     */
    private orderByCoparision: Sort<T>[] = [];

    /**
     * @access private
     * @property {PredeicateIndex<T>[]}
     * @default {[]}
     * @description store the conditional where filters
     */
    private whereConditionClosures: {_con: boolean, _predi: PredeicateIndex<T>}[] = [];

    /**
     * @access private
     * @property {number}
     * @default {[]}
     * @description store the limit value
     */
    private limit = 0;

    /**
     * @access private
     * @property {number}
     * @default {[]}
     * @description store the offset value
     */
    private offset = 0;

    /**
     * @access private
     * @property {Predicate<T> | null} ruleSkip
     * @description store the predicate to evaluate the skip condition
     */
    private ruleSkip: Predicate<T> | null = null;

    /**
     * @access private
     * @property {Predicate<T> | null} ruleTake
     * @description store the predicate to evaluate the take condition
     */
    private ruleTake: Predicate<T> | null = null;

    /**
     * @constructor
     * @param {Iterable<T>} _source - this is the source to provide elements to query
     * @access public
     * @description allow recive the source to Queryable<T>
     */
    constructor(_source: Iterable<T>)
    {
        this.source = _source;
    }

    fork<K>(func: (parent: Iterable<T>, next: (arg: K) => void) => void): IQueryable<K> {
        const storage: K[] = [];
        // this function must create a fork with parent iterator and hook fucntion
        // that register a new element in the array storage
        // then the array storage is the second source from new query forked
        func.call(null, this, element => storage.push(element));
        return new Queryable<K>(storage);
    }

    where(evaluate: Predicate<T>): IQueryable<T>;
    // tslint:disable-next-line: unified-signatures
    where(evaluate: PredeicateIndex<T>): IQueryable<T>;

    where(evaluate: any): IQueryable<T> {
        this.whereClosures.push(evaluate);
        return this;
    }

    except(evaluate: Predicate<T>): IQueryable<T>;
    // tslint:disable-next-line: unified-signatures
    except(evaluate: PredeicateIndex<T>): IQueryable<T>;

    except(evaluate: any): IQueryable<T> {
        this.where((x: any,i=undefined) => !evaluate(x,i));
        return this;
    }

    notNull(evaluate: FreeFunc<T>): IQueryable<T> {
        this.where((x: T) => evaluate(x) !== null);
        return this;
    }

    isNull(evaluate: FreeFunc<T>): IQueryable<T> {
        this.where((x: T) => evaluate(x) === null);
        return this;
    }

    toBeRange<K>(evaluate: Func<T, K>, range: Iterable<K>): IQueryable<T> {
        throw new Error('Method not implemented.');
    }

    between<K = number | Date>(evaluate: Func<T, K>, start: K, end: K): IQueryable<T> {
        throw new Error('Method not implemented.');
    }

    match(element: Partial<T>): IQueryable<T> {
        throw new Error('Method not implemented.');
    }

    exclude(element: Partial<T>): IQueryable<T> {
        throw new Error('Method not implemented.');
    }

    distinct(func: FreeFunc<T>): IQueryable<T> {
        throw new Error('Method not implemented.');
    }

    join<TOuter, Result>(query: IQueryable<TOuter, QueryableDefaultReturn<TOuter>>, on: (inner?: T, outer?: TOuter) => boolean, result: (inner?: T, outer?: TOuter) => Result | null, behavior?: 'left' | 'right' | 'inner' | 'reset'): IQueryable<Result, QueryableDefaultReturn<Result>> {
        throw new Error('Method not implemented.');
    }

    export(): IQueryable<T> {
        throw new Error('Method not implemented.');
    }

    build<K>(builder: (element: T, next: (arg: K) => void) => void): IQueryable<K, QueryableDefaultReturn<K>> {
        const parent = this;
        const iterableExec: Iterable<K> = {
            *[Symbol.iterator]() {
                let state: K|null = null;
                for (const current of parent) {
                    builder(current, (arg) => state = arg);
                    if(state !== null){
                        yield state;
                        state = null;
                    }
                }
            }
        };
        return new Queryable<K>(iterableExec);
    }

    assertMode(): IAssertQueryable<T> {
        throw new Error('Method not implemented.');
    }

    contains(element: T): boolean {
        throw new Error('Method not implemented.');
    }

    single(predicate: Predicate<T>, _def?: T): T | null {
        for (const current of this) {
            if(predicate.call(null, current)){
                return current;
            }
        }
        return null;
    }

    random(): T|null {
        const max = this.count();
        if(max === 0){
            return null;
        }
        const limit = randomNum(0, max);
        const index = 0;
        for (const current of this) {
            // this loop determine that element is selected by random
            if(index >= limit){
                return current;
            }
        }
        return null;
    }

    ofType<K>(): IQueryable<K> {
        throw new Error('Method not implemented.');
    }

    whereIf(condition: boolean, evaluate: Predicate<T>): IQueryable<T>;
    // tslint:disable-next-line: unified-signatures
    whereIf(condition: boolean, evaluate: PredeicateIndex<T>): IQueryable<T>;

    whereIf(condition: any, evaluate: any): IQueryable<T> {
        this.whereConditionClosures.push({_con:condition, _predi:evaluate});
        return this;
    }

    select<K>(map: Selector<T, K>): IQueryable<K> {
        this.selectClosures = map;
        return new Queryable<K>(this as unknown as Iterable<K>);
    }

    concat(query: IQueryable<T>): IQueryable<T> {
        // the concat method in this case is very simply to implement
        // but is possible improve and optimize
        return new Queryable<T>(Array.from(this).concat(query.toArray()));
    }

    orderBy<K>(func: Rtrn<K>): IQueryable<T>;
    orderBy(func: Sort<T>): IQueryable<T>;

    orderBy(func: any): IQueryable<T> {
        if(typeof func !== 'function'){
            throw new TypeError('the order by functions should be callable');
        }

        const order = func as {lenght:number};

        if(order.lenght === 2){
            this.orderByCoparision.push(func);
        }else{
            this.ordersByValue.push(func);
        }
        return this;
    }

    groupBy<K>(func: Rtrn<K>): IQueryableGroup<K, T> {
        throw new Error('Method not implemented.');
    }

    reverse(): IQueryable<T> {
        // quick reverse by array method
        this.source = Array.from(this.source).reverse();
        return this;
    }

    agregate<K>(func: Reducer<T, K>, initial: K | null): K|null {
        let state = initial;
        for (const current of this) {
           state = func.call(null, current, state as K);
        }
        return state;
    }

    any(): boolean {
        for (const _ of this) {
           return true;
        }
        return false;
    }

    all(): boolean {
        throw new Error('Method not implemented.');
    }

    count(): number {
       let result = 0;
       for (const _ of this) {
           result++;
       }
       return result;
    }

    skip(count: number): IQueryable<T> {
        this.offset = count;
        return this;
    }

    skipWhile(skip: Predicate<T>): IQueryable<T> {
        this.ruleSkip = skip;
        return this;
    }

    take(count: number): IQueryable<T> {
        this.limit = count;
        return this;
    }

    takeWhile(takeCondition: Predicate<T>): IQueryable<T> {
      this.ruleTake = takeCondition;
      return this;
    }

    first(): T {
        for (const _ of this) {
            return _;
         }
         return null as unknown as T;
    }

    last(): T {
        let current: T|null = null;
        for (const _ of this) {
            current = _;
         }
         return current as unknown as T;
    }

    toArray(): T[] {
       return Array.from(this);
    }

    toSet(): Set<T> {
       return new Set(this);
    }

    toStream(): ReadableStream<T>;
    toStream<K>(conversion: Selector<T, Promise<K>>): ReadableStream<T>;

    toStream(conversion?: any): ReadableStream<T> {
        /*if(conversion === undefined || conversion === undefined){
            const stream = new WritableStream<T>();
        }else{
            throw new TypeError('the conversion should be function');
        }*/
        throw new Error();
    }

    toMap(mapper: (arg: T) => [string, T]): Map<string,T> {
        const map = new Map<string,T>();
        for (const current of this) {
           const [key,value] = mapper(current);
            map.set(key, value);
        }
        return map;
    }

    forEach(action: Action<T>): void {
        for (const current of this) {
            action.call(null, current);
        }
    }

    poll(evaluator: (arg: T) => number, forMax = true): T|null {
        let result: T|null = null;
        let record: number = 0;
        let initial = true;
        for (const current of this) {
            const evluation = evaluator(current);
            if(initial){
                result = current;
                record = evluation;
                initial = false;
                continue;
            }
            if(forMax && evluation > record){
                result = current;
                record = evluation;
            }else if(!forMax && evluation < record){
                result = current;
                record = evluation;
            }
        }
        return result;
    }

    * [Symbol.iterator](): Iterator<T, any, undefined> {

        // simples vars
        let skipped = 0;
        let takeElms = 0;

        // main iterator loop
        // this loop help use the source of the query as Iterable
        for (const current of this.source) {
            /**
             * @var {T} current
             * this loop create an iterator from source
             */

            // check limit and offset
            if((this.ruleTake !== null && !this.ruleTake?.call(null, current)) || (this.limit !== 0 && this.limit === takeElms)){
                break;
            }

            if(this.ruleSkip !== null && this.ruleSkip?.call(null, current)){
                continue;
            }
            else if(this.offset !== 0 && this.offset === skipped){
                skipped++;
                continue;
            }

            const pass = this.applyFilters(current);

            // check the pass and limit
            if(!pass){
                continue;
            }else{
                takeElms++;
            }

            // check if is transform
            if(this.selectClosures === undefined){
                yield current;
            }else{
                // return a result transform by selet function
                yield this.selectClosures(current);
            }
        }
    }

    /**
     * @function applyFilters
     * @description invoke all where filters
     * @access private
     */
    private applyFilters(element: T): boolean{
        const filters = this.whereClosures.concat(
            this.whereConditionClosures
            .filter(w => w._con)
            .map(w => w._predi)
        );

        // invoke the filter above current element
        for (let index = 0; index < filters.length; index++) {
            const where = filters[index];
            if(where(element, index)){
                continue;
            }else{
                return false;
            }
        }
        // pass filter
        return true;
    }
}