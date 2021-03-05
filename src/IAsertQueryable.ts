import { IQueryable } from './IQueryable';
import { KeyOrString } from './signtures';

/**
 * @abstract
 * @interface IAsertControl
 */
export interface IAsertControl<TRecord>{
    /**
     * @param  {KeyOrString<TRecord>} key
     * @param  {any} value
     * @returns IAssertQueryable
     */
    equal(key: KeyOrString<TRecord>, value: any): this;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @param  {number} value
     * @returns IAssertQueryable
     */
    greather(key: KeyOrString<TRecord>, value: number): this;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @param  {number} value
     * @returns IAssertQueryable
     */
    greatherEqual(key: KeyOrString<TRecord>, value: number): this;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @param  {number} value
     * @returns IAssertQueryable
     */
    less(key: KeyOrString<TRecord>, value: number): this;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @param  {number} value
     * @returns IAssertQueryable
     */
    lessEqual(key: KeyOrString<TRecord>, value: number): this;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @param  {number} start
     * @param  {number} end
     * @returns IAssertQueryable
     */
    betweenAt(key: KeyOrString<TRecord>, start: number, end: number): this;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @param  {any[]} ...value
     * @returns IAssertQueryable
     */
    in(key: KeyOrString<TRecord>, ...value: any[]): this;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @param  {string|RegExp} expression
     * @returns IAssertQueryable
     */
    regex(key: KeyOrString<TRecord>, expression: string | RegExp): this;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @param  {KeyOrString<TRecord>} key2
     * @returns IAssertQueryable
     */
    same(key: KeyOrString<TRecord>, key2: KeyOrString<TRecord>): this;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @returns IAssertQueryable
     */
    isArray(key: KeyOrString<TRecord>): this;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @returns IAssertQueryable
     */
    isFunction(key: KeyOrString<TRecord>): this;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @returns IAssertQueryable
     */
    isObject(key: KeyOrString<TRecord>): this;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @returns IAssertQueryable
     */
    isString(key: KeyOrString<TRecord>): this;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @returns IAssertQueryable
     */
    isNumber(key: KeyOrString<TRecord>): this;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @returns IAssertQueryable
     */
    isDate(key: KeyOrString<TRecord>): this;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @returns IAssertQueryable
     */
    isTrue(key: KeyOrString<TRecord>): this;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @returns IAssertQueryable
     */
    isFalse(key: KeyOrString<TRecord>): this;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @param  {Date|number|string} date
     * @returns IAssertQueryable
     */
    isToday(key: KeyOrString<TRecord>, date: Date|number|string): this;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @param  {Date|number|string} date
     * @returns IAssertQueryable
     */
    beforeAt(key: KeyOrString<TRecord>, date: Date|number|string): this;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @param  {Date|number|string} date
     * @returns IAssertQueryable
     */
    afterAt(key: KeyOrString<TRecord>, date: Date|number|string): this;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @param  {Date|number|string} date
     * @param  {number} seconds
     * @returns IAssertQueryable
     */
    ago(key: KeyOrString<TRecord>, date: Date|number|string, seconds: number): this;

    /**
     * @param  {KeyOrString<TRecord>} key
     * @param  {Date|number|string} date
     * @param  {"second"|"minute"|"hour"|"day"|"week"} mesure
     * @returns IAssertQueryable
     */
    agoOne(
     key: KeyOrString<TRecord>,
     date: Date|number|string,
     mesure: "second"|"minute"|"hour"|"day"|"week"): this;
}

/**
 * This query type allow create filter without lambda seelction
 * then the dynamic filter si support
 * also you have more differents patterns to filter records
 * @abstract
 * @interface IAssertQueryable<TRecord>
 * @description The query with assert feature that allow filter with dynamic key name
 */
export interface IAsertQueryable<TRecord>
extends Omit<IQueryable<TRecord>, "assertMode">, IAsertControl<TRecord>{
}