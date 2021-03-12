import { IAssertQueryable } from './IAssertQueryable';
import { IQueryableGroup } from './IQueryableGroup';
import { FreeFunc, Func } from './signtures';
import { InteractiveQuery } from './InteractiveQuery';
import {
    Predicate, PredeicateIndex,
    Selector, Rtrn, Sort,
    Reducer, Action
} from './signtures';

// simple typing alias
type JoinBehavior = "left" | "right" | "inner";

// the basic alias
export type QueryableDefaultReturn<T> = IQueryable<T>;

/**
 * This interface is the principal contracts for all artifact of linq script
 * Through this interface you can implement the query engine
 * All method help to create a eloquent queries
 * Many method has API Fluent pattern
 * The class that implements this interface is a iterable
 * The type argument is a type of elements
 * @abstract
 * @interface IQueryableControl<T,_TFluent>
 * @access public
 * @argument T this argument is the type record
 * @argument _TFluent this argument is the type return
 * @description the main interface to make queries by linq
 */
export interface IQueryableControl<T = any, _TFluent =  QueryableDefaultReturn<T>>{

    /**
     * @method ofType
     * @argument K the type to filter all elements
     * @description evaluate if the record must be selected, this is a filter
     */
    cast<K>(): IQueryable<K>;

    /**
     * @method where
     * @param {Predicate<T>} evaluate the function that determine the elements of query
     * @description evaluate if the record must be selected, this is a filter
     */
    where(evaluate: Predicate<T>): _TFluent;

    /**
     * @method where
     * @param {PredeicateIndex<T>} evaluate the function that determine the elements of query
     * @description evaluate if the record must be selected, this is a filter
     */
    // tslint:disable-next-line: unified-signatures
    where(evaluate: PredeicateIndex<T>): _TFluent;

    /**
     * @method except
     * @param {Predicate<T>} evaluate the function that determine the elements of query
     * @description evaluate if the record must be selected, this is a filter
     */
    except(evaluate: Predicate<T>): _TFluent;

    /**
     * @method except
     * @param {PredeicateIndex<T>} evaluate the function that determine the elements of query
     * @description evaluate if the record must be selected, this is a filter
     */
    // tslint:disable-next-line: unified-signatures
    except(evaluate: PredeicateIndex<T>): _TFluent;

    /**
     * @method notNull
     * @param {FreeFunc} evaluate the function that determine the elements of query
     * @description evaluate if the record must be selected, match if is not null
     */
    notNull(evaluate: FreeFunc<T>): _TFluent;

    /**
     * @method isNull
     * @param {FreeFunc} evaluate the function that determine the elements of query
     * @description evaluate if the record must be selected, match if is null
     */
    isNull(evaluate: FreeFunc<T>): _TFluent;

    /**
     * @method toBeRange
     * @param {Func<T,K>} evaluate The fucntion that return the value
     * @param {Iterable<K>} range The iterator that provide the range
     * @description evaluate if the record must be selected, match if value to be in range
     */
    toBe<K>(evaluate: Func<T,K>, range: Iterable<K>): _TFluent;

    /**
     * @method toBeOut
     * @param evaluate The fucntion that return the value
     * @param range The iterator that provide the range
     * @description  evaluate if the record must be out the selected range iterable
     */
    toBeOut<K>(evaluate: Func<T, K>, range: Iterable<K>): _TFluent;

    /**
     * @method between
     * @param {PredeicateIndex<T>} evaluate the function that determine the elements of query
     * @param {K} start the begin for range
     * @param {K} end the end for range
     * @description evaluate if the record must be selected, match if value to be in range
     */
    between<K = number|Date>(evaluate: Func<T,K>, start: K, end: K): _TFluent;

    /**
     * @method exact
     * @param element
     * @description this method add a filter that exclude all element to match with target
     */
    exact(element: T): _TFluent;

    /**
     * @method match
     * @param element
     * @description this method add a filter that exclude all element to match with target
     */
    match(element: Partial<T>): _TFluent;

    /**
     * @method not
     * @param element
     * @description this method add a filter that exclude all element to match with target
     */
    not(element: Partial<T>): _TFluent;

    /**
     * @method exlude
     * @param element
     * @description this method add a filter that exclude all element to match with target
     */
    exlude(element: T): _TFluent;

    /**
     * @function distinct
     * @param {FreeFunc<T>} func The function to filter by distinct
     * @description add the filter base on distinct value for a field or value of query
     */
    distinct(func: FreeFunc<T>): _TFluent;

    /**
     * @method whereIf
     * @param {Predicate<T>} evaluate the function that determine the elements of query
     * @description evaluate if the record must be selected, this is a filter
     */
    whereIf(condition: boolean, evaluate: Predicate<T>): _TFluent;

    /**
     * @method whereIf
     * @param {PredeicateIndex<T>} evaluate the function that determine the elements of query
     * @description evaluate if the record must be selected, this is a filter
     */
    // tslint:disable-next-line: unified-signatures
    whereIf(condition: boolean, evaluate: PredeicateIndex<T>): _TFluent;

    /**
     * @method select select<K>
     * @param {Selector<T,K>} map The functiuon that make a trasnformation
     * @description this method recive the selector of query
     * @return an IQueryable with other argument type
     */
    select<K>(map: Selector<T,K>): IQueryable<K>;

    /**
     * @method join<TOuter,Result>
     * @param {IQueryable<TOuter>} query The other query with join this
     * @param {(inner: T, outer?: TOuter) => boolean} on the function that determine the union
     * @param {(inner?: T, outer?: TOuter) => Result|null} result the function that make a result to create a new query joined
     * @param {JoinBehavior} behavior this parameter determine
     * @description make a new join query
     * @return new query with joined result
     */
    join<TOuter, Result>(
        query: Iterable<TOuter>,
        on: (inner: T, outer: TOuter) => boolean,
        result: (inner: T|null, outer: TOuter|null) => Result,
        behavior?: JoinBehavior): IQueryable<Result>;

   /**
    * @method innerJoin
    * @param query
    * @param on
    * @param result
    */
    innerJoin<TOuter, Result>(query: Iterable<TOuter>,
        on: (inner: T, outer: TOuter) => boolean,
        result: (inner: T, outer: TOuter) => Result): IQueryable<Result>;

   /**
    * @method leftJoin
    * @param query
    * @param on
    * @param result
    */
    leftJoin<TOuter, Result>(query: Iterable<TOuter>,
        on: (inner: T, outer: TOuter) => boolean,
        result: (inner: T, outer: TOuter|null) => Result|null): IQueryable<Result>;


   /**
    * @method rightJoin
    * @param query
    * @param on
    * @param result
    */
    rightJoin<TOuter,Result>(query: Iterable<TOuter>,
        on: (inner: T, outer: TOuter) => boolean,
        result: (inner: T|null, outer: TOuter) => Result): IQueryable<Result>;


    /**
     * @method export
     * @description clone this query
     * @returns a copy of target query
     */
    export(): _TFluent;

    /**
     * @method build<K>
     * @description this function allow build a new query base on parent query
     * @param {Iterable<T>, next: (arg: K) => void) => void) } builder The function to build a new query
     * @returns create a new query base on builder
     */
    createWith<K>(filter: Predicate<T>, builder: (parent: T, next: (arg: K) => void) => void): IQueryable<K>;

    /**
     * @method fork<K>
     * @description this function allow fork the query
     * @param {Iterable<T>, next: (arg: K) => void) => void) } builder The func to fork
     * @returns create a new query base on fork
     */
    create<K>(func: (parent: Iterable<T>, next: (arg: K) => void) => void): IQueryable<K>;

    /**
     * @method concat
     * @param {IQueryable<T>} query The query be will concatenate
     * @description make a union with concat behavior
     * @return an IQueryable concatenated
     */
    concat(query: Iterable<T>): _TFluent;

    /**
     * @method concat
     * @param {IQueryable<T>} query The query be will concatenate
     * @description make a union with concat behavior but on the first the second source
     * @return an IQueryable concatenated
     */
    append(query: Iterable<T>): _TFluent;

    /**
     * @method orderBy<K>
     * @param func The fucntion to select the property o value to compare sort
     * @description make a sort comparation
     */
    orderBy(func: Func<T,any>): _TFluent;

    /**
     * @method orderBy<K>
     * @param func The fucntion to select the property o value to compare sort
     * @description make a sort comparation
     */
    orderBy(func: Sort<T>): _TFluent;

    /**
     * @method orderBy<K>
     * @param func The fucntion to select the property o value to compare sort
     * @description make a sort comparation
     */
    orderByDescending(func: Func<T,any>): _TFluent;

    /**
     * @method reverse
     * @description make a sort reverse
     * @returns the query but with sort invert results
     */
    reverse(): _TFluent;

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
    agregate<K>(func: Reducer<T, K>, initial: K|null):  K|null;

    /**
     * @function assertMode
     * @description convert the query to has support to make assets
     * @return a new query with asserts
     */
    assertMode(): IAssertQueryable<T>;

    /**
     * @method skip
     * @param {number} count the number that element will be skiped
     */
    skip(count: number): _TFluent;

    /**
     * @method skipUntil
     * @param {Predicate<T>} count the predicate that determine to skip
     */
    skipWhile(skip: Predicate<T>): _TFluent;

    /**
     * @method take
     * @param {number} count the max element to match
     */
    take(count: number): _TFluent;

    /**
     * @method takeUntil
     * @param {Predicate<T>} count the predicate that determine to take
     */
    takeWhile(count: Predicate<T>): _TFluent;
}

/**
 * this intergace contains the main method to resolve or get serveral types of
 * the results about a query
 * the inetrface contains all related with results of the query and not modify any state
 * @abstract
 * @interface IQueryable
 * @description the std query interface
 */
export interface IQueryable<T = any, _TFluent =  QueryableDefaultReturn<T>>
extends IQueryableControl<T, _TFluent>, Iterable<T>
{
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
     * @method contains
     * @description allow know if any elements match with argument
     * @param {T} element The element to match
     * @return true if any element match with argument
     */
    contains(element: T): boolean;

    /**
     * @method contains
     * @description allow know if any elements match with argument
     * @param {Predicate<T>} predicate funtion that test result
     * @return true if any element match with argument
     */
    // tslint:disable-next-line: unified-signatures
    contains(predicate: Predicate<T>): boolean;

    /**
     * @method count
     * @return the number of element that match with query
     */
    count(): number;

    /**
     * @method first
     * @return the first record that match
     */
    first(): T;

    /**
     * @method first
     * @return the first record that match
     */
    single(predicate: Predicate<T>, _def?: T): T|null;

    /**
     * @method last
     * @return the last record that match
     */
    last(): T;

    /**
     * @method random
     * @return the random record that match
     */
    random(): T|null;

    /**
     * @method toArray
     * @return an array of element that match with query
     */
    toArray(): T[];

    /**
     * @method toArray
     * @param { Func<T, K>)} columnSelect the selector of a field to create an array
     * @description Create an Array from field selection
     */
    toArrayColumn<K>(columnSelect: Func<T, K>): K[];

    /**
     * @method toJson
     * @return a string with serialized content
     */
    toJson(idented?: boolean): string;

    /**
     * @method toSet
     * @return a set of element that match with query
     */
    toSet(): Set<T>;

    /**
     * @method toMap
     * @param {(arg: T) => [string, T]} mapper a fucntion that resolve key of map
     * @return a map of element that match with query with string key
     */
    toMap(mapper: (arg: T) => [string, T]): Map<string,T>;

    /**
     * @method forEach
     * @param {Action<T>} action this is a function that process the result
     * @description simple iterator for process all element that match with query
     */
    forEach(action: Action<T>): void;

    /**
     * @method poll
     * @description make a evaluation to resolve the result element in the query
     * @param evaluator the basic function that return an evaluation result
     * @param forMax determine if the reesult is grather or less
     * @returns element with the best result
     */
    poll(evaluator: (arg: T) => number, forMax?: boolean): T|null;

    /**
     * @method toInteractive
     * @description create an interactive query with result of the query
     * @returns a new interactive query instance
     */
    toInteractive(): InteractiveQuery<T>;
}