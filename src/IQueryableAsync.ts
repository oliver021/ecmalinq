import { InteractiveQuery } from "./InteractiveQuery";
import { IQueryable, IQueryableControl, QueryableDefaultReturn } from "./IQueryable";
import { Action, Func, Predicate } from "./signtures";

/**
 * this intergace contains the main method to resolve or get serveral types of
 * the results about a query BUT the way asyncronous
 * the inetrface contains all related with results of the query and not modify any state
 * the query that implement this interface should do resolve all result by Promise
 * @abstract
 * @interface IQueryableAsync
 * @description the std query interface
 */
export interface IQueryableAsync<T = any, _TFluent =  QueryableDefaultReturn<T>>
 extends IQueryableControl<T, _TFluent>, AsyncIterable<T>{

    /**
     * @method any
     * @description allow know if any element match with query
     * @return true if any match with query
     */
    anyAsync(): boolean;

    /**
     * @method all
     * @description allow know if all elements match with query
     * @return true if all match with query
     */
    allAsync(): boolean;

    /**
     * @method contains
     * @description allow know if any elements match with argument
     * @param {T} element The element to match
     * @return true if any element match with argument
     */
    containsAsync(element: T): boolean;

    /**
     * @method contains
     * @description allow know if any elements match with argument
     * @param {Predicate<T>} predicate funtion that test result
     * @return true if any element match with argument
     */
    // tslint:disable-next-line: unified-signatures
    containsAsync(predicate: Predicate<T>): boolean;

    /**
     * @method count
     * @return the number of element that match with query
     */
    countAsync(): Promise<number>;

    /**
     * @method first
     * @return the first record that match
     */
    firstAsync(): Promise<T>;

    /**
     * @method first
     * @return the first record that match
     */
    singleAsync(predicate: Predicate<T>, _def?: T): Promise<T|null>;

    /**
     * @method last
     * @return the last record that match
     */
    lastAsync(): Promise<T>;

    /**
     * @method random
     * @return the random record that match
     */
    randomAsync(): Promise<T|null>;

    /**
     * @method toArray
     * @return an array of element that match with query
     */
    toArrayAsync(): Promise<T[]>;

    /**
     * @method toArray
     * @param { Func<T, K>)} columnSelect the selector of a field to create an array
     * @description Create an Array from field selection
     */
    toArrayColumnAsync<K>(columnSelect: Func<T, K>): Promise<K[]>;

    /**
     * @method toJson
     * @return a string with serialized content
     */
    toJson(idented: boolean): Promise<string>;

    /**
     * @method toSet
     * @return a set of element that match with query
     */
    toSetAsync(): Promise<Set<T>>;

    /**
     * @method toMap
     * @param {Async(arg: T) => [string, T]} mapper a fucntion that resolve key of map
     * @return a map of element that match with query with string key
     */
    toMapAsync(mapper: (arg: T) => [string, T]): Promise<Map<string,T>>;

    /**
     * @method forEach
     * @param {Action<T>} action this is a function that process the result
     * @description simple iterator for process all element that match with query
     */
    forAllAsync(action: Action<T>): Promise<void>;

    /**
     * @method poll
     * @description make a evaluation to resolve the result element in the query
     * @param evaluator the basic function that return an evaluation result
     * @param forMax determine if the reesult is grather or less
     * @returns element with the best result
     */
    pollAsync(evaluator: (arg: T) => number, forMax?: boolean): Promise<T|null>;

    /**
     * @method toInteractive
     * @description create an interactive query with result of the query
     * @returns a new interactive query instance
     */
    toInteractiveAsync(): Promise<InteractiveQuery<T>>;

    /**
     * this is a special method without version syncronous in IQueryable
     * because, this method resolve all element of que async query and
     * create a new query without async flow
     * @method sync
     * @description make a syncronous query
     * @return new query with result of the async query
     */
    sync(): Promise<IQueryable<T>>;
}