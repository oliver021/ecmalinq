import { IQueryableGroup } from './iqueryable-group';
import { 
    Predeicate, PredeicateIndex,
    Selector, Rtrn, Sort,
    Reducer, Action
} from './signtures';

/**
 * @abstract
 * @interface IQueryable<T>
 * @access public
 * @argument T thid argument is the type record
 * @description the main interface to make queries by linq
 */
export interface IQueryable<T = any> extends Iterable<T>{

    /**
     * @method ofType
     * @argument K the type to filter all elements
     * @description evaluate if the record must be selected, this is a filter
     */
    ofType<K>(): IQueryable<K>;

    /**
     * @method where
     * @param {Predeicate<T>} evaluate the function that determine the elements of query
     * @description evaluate if the record must be selected, this is a filter
     */
    where(evaluate: Predeicate<T>): IQueryable<T>;

    /**
     * @method where
     * @param {PredeicateIndex<T>} evaluate the function that determine the elements of query
     * @description evaluate if the record must be selected, this is a filter
     */
    // tslint:disable-next-line: unified-signatures
    where(evaluate: PredeicateIndex<T>): IQueryable<T>;

    /**
     * @method whereIf
     * @param {Predeicate<T>} evaluate the function that determine the elements of query
     * @description evaluate if the record must be selected, this is a filter
     */
    whereIf(condition: boolean, evaluate: Predeicate<T>): IQueryable<T>;

    /**
     * @method whereIf
     * @param {PredeicateIndex<T>} evaluate the function that determine the elements of query
     * @description evaluate if the record must be selected, this is a filter
     */
    // tslint:disable-next-line: unified-signatures
    whereIf(condition: boolean, evaluate: PredeicateIndex<T>): IQueryable<T>;

    /**
     * @method select select<K>
     * @param {Selector<T,K>} map The functiuon that make a trasnformation
     * @description this method recive the selector of query
     * @return an IQueryable with other argument type
     */
    select<K>(map: Selector<T,K>): IQueryable<K>;

    /**
     * @method concat
     * @param {IQueryable<T>} query The query be will concatenate
     * @description make a union with concat behavior
     * @return an IQueryable concatenated
     */
    concat(query: IQueryable<T>): IQueryable<T>;

    /**
     * @method orderBy<K>
     * @param func The fucntion to select the property o value to compare sort
     * @description make a sort comparation
     */
    orderBy<K>(func: Rtrn<K>): IQueryable<K>;

    /**
     * @method orderBy<K>
     * @param func The fucntion to select the property o value to compare sort
     * @description make a sort comparation
     */
    orderBy(func: Sort<T>): IQueryable<T>;

    /**
     * @method reverse
     * @description make a sort reverse
     * @returns the query but with sort invert results
     */
    reverse(): IQueryable<T>;

    /**
     * @method orderBy<K>
     * @param func The fucntion to select the property o value to group
     * @description make a group of records
     */
    groupBy<K>(func: Rtrn<K>): IQueryableGroup<K,T>;

    /**
     * @method agregate<K>
     * @param { Reducer<T, K>} func the basic reducer function to get a simple value
     * @param { K } initial the initial value
     */
    agregate<K>(func: Reducer<T, K>, initial: K|null): K;

    /**
     * @method any
     * @description allow know if any element match with query
     * @return true if any match with query
     */
    any(): boolean;

    /**
     * @method all
     * @description allow know if all elements match with query
     * @return true if all match with query
     */
    all(): boolean;

    /**
     * @method count
     * @return the number of element that match with query
     */
    count(): number;

    /**
     * @method skip
     * @param {number} count the number that element will be skiped
     */
    skip(count: number): IQueryable<T>;

    /**
     * @method skipUntil
     * @param {Predeicate<T>} count the predicate that determine to skip
     */
    skipUntil(skip: Predeicate<T>): IQueryable<T>;

    /**
     * @method take
     * @param {number} count the max element to match
     */
    take(count: number): IQueryable<T>;

    /**
     * @method takeUntil
     * @param {Predeicate<T>} count the predicate that determine to take
     */
    takeUntil(count: Predeicate<T>): IQueryable<T>;

    /**
     * @method first
     * @return the first record that match
     */
    first(): T;

    /**
     * @method last
     * @return the last record that match
     */
    last(): T;

    /**
     * @method toArray
     * @return an array of element that match with query
     */
    toArray(): T[];

    /**
     * @method toSet
     * @return a set of element that match with query
     */
    toSet(): Set<T>;

    /**
     * @method toStream
     * @return a stream of element that match with query
     */
    toStream(): ReadableStream<T>;

    /**
     * @method toStream<K>
     * @description convert the element that match with query by async fucntion
     * @return a stream of element that match with query
     */
    toStream<K>(conversion: Selector<T, Promise<K>>): ReadableStream<T>;

    /**
     * @method toMap
     * @param {(arg: T) => [string, T]} mapper a fucntion that resolve key of map
     * @return a map of element that match with query with string key
     */
    toMap(mapper: (arg: T) => [string, T]): Set<T>;

    /**
     * @method forEach
     * @description simple iterator for process all element that match with query
     */
    forEach(action: Action<T>): void;
}