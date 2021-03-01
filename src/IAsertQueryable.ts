import { KeyOrString } from './signtures';
import { IQueryable } from './IQueryable';

/**
 * @abstract
 * @interface IAsertControl
 */
export interface IAssertControl<TRecord>{
    /**
     * @param  {KeyOrString<TRecord>} key
     * @param  {any} value
     * @returns IAssertQueryable
     */
    equal(key: KeyOrString<TRecord>, value: any): IAssertQueryable<TRecord>;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @param  {number} value
     * @returns IAssertQueryable
     */
    greather(key: KeyOrString<TRecord>, value: number): IAssertQueryable<TRecord>;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @param  {number} value
     * @returns IAssertQueryable
     */
    greatherEqual(key: KeyOrString<TRecord>, value: number): IAssertQueryable<TRecord>;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @param  {number} value
     * @returns IAssertQueryable
     */
    less(key: KeyOrString<TRecord>, value: number): IAssertQueryable<TRecord>;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @param  {number} value
     * @returns IAssertQueryable
     */
    lessEqual(key: KeyOrString<TRecord>, value: number): IAssertQueryable<TRecord>;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @param  {number} start
     * @param  {number} end
     * @returns IAssertQueryable
     */
    betweenAt(key: KeyOrString<TRecord>, start: number, end: number): IAssertQueryable<TRecord>;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @param  {any[]} ...value
     * @returns IAssertQueryable
     */
    in(key: KeyOrString<TRecord>, ...value: any[]): IAssertQueryable<TRecord>;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @param  {string|RegExp} expression
     * @returns IAssertQueryable
     */
    regex(key: KeyOrString<TRecord>, expression: string | RegExp): IAssertQueryable<TRecord>;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @param  {KeyOrString<TRecord>} key2
     * @returns IAssertQueryable
     */
    same(key: KeyOrString<TRecord>, key2: KeyOrString<TRecord>):  IAssertQueryable<TRecord>;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @returns IAssertQueryable
     */
    isArray(key: KeyOrString<TRecord>):  IAssertQueryable<TRecord>;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @returns IAssertQueryable
     */
    isFunction(key: KeyOrString<TRecord>):  IAssertQueryable<TRecord>;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @returns IAssertQueryable
     */
    isObject(key: KeyOrString<TRecord>):  IAssertQueryable<TRecord>;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @returns IAssertQueryable
     */
    isString(key: KeyOrString<TRecord>):  IAssertQueryable<TRecord>;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @returns IAssertQueryable
     */
    isNumber(key: KeyOrString<TRecord>):  IAssertQueryable<TRecord>;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @returns IAssertQueryable
     */
    isDate(key: KeyOrString<TRecord>):  IAssertQueryable<TRecord>;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @returns IAssertQueryable
     */
    isTrue(key: KeyOrString<TRecord>):  IAssertQueryable<TRecord>;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @returns IAssertQueryable
     */
    isFalse(key: KeyOrString<TRecord>):  IAssertQueryable<TRecord>;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @param  {Date|number|string} date
     * @returns IAssertQueryable
     */
    isToday(key: KeyOrString<TRecord>, date: Date|number|string):  IAssertQueryable<TRecord>;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @param  {Date|number|string} date
     * @returns IAssertQueryable
     */
    beforeAt(key: KeyOrString<TRecord>, date: Date|number|string):  IAssertQueryable<TRecord>;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @param  {Date|number|string} date
     * @returns IAssertQueryable
     */
    afterAt(key: KeyOrString<TRecord>, date: Date|number|string):  IAssertQueryable<TRecord>;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @param  {Date|number|string} date
     * @param  {number} seconds
     * @returns IAssertQueryable
     */
    ago(key: KeyOrString<TRecord>, date: Date|number|string, seconds: number):  IAssertQueryable<TRecord>;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @param  {Date|number|string} date
     * @param  {"second"|"minute"|"hour"|"day"|"week"} mesure
     * @returns IAssertQueryable
     */
    agoOne(
     key: KeyOrString<TRecord>,
     date: Date|number|string,
     mesure: "second"|"minute"|"hour"|"day"|"week"): IAssertQueryable<TRecord>;
}

/**
 * This query type allow create filter without lambda seelction
 * then the dynamic filter si support
 * also you have more differents patterns to filter records
 * @abstract
 * @interface IAssertQueryable<TRecord>
 * @description The query with assert feature that allow filter with dynamic key name
 */
export interface IAssertQueryable<TRecord>
extends Omit<IQueryable<TRecord, IAssertQueryable<TRecord>>, "assertMode">, IAssertControl<TRecord>{
}