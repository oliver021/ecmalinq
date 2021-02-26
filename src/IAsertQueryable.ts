import { KeyOrString } from './signtures';
import { IQueryable } from './IQueryable';

/**
 * @abstract
 * @interface IAssertQueryable<T>
 * @description The query with assert feature that allow filter with dynamic key name
 */
export interface IAssertQueryable<T> extends IQueryable<T, IAssertQueryable<T>>{

    equal(key: KeyOrString<T>, value: any): IAssertQueryable<T>;
    greather(key: KeyOrString<T>, value: number): IAssertQueryable<T>;
    greatherEqual(key: KeyOrString<T>, value: number): IAssertQueryable<T>;
    less(key: KeyOrString<T>, value: number): IAssertQueryable<T>;
    lessEqual(key: KeyOrString<T>, value: number): IAssertQueryable<T>;
    betweenAt(key: KeyOrString<T>, start: number, end: number): IAssertQueryable<T>;
    in(key: KeyOrString<T>, ...value: any[]): IAssertQueryable<T>;
    regex(key: KeyOrString<T>, expression: string | RegExp): IAssertQueryable<T>;
    same(key: KeyOrString<T>, key2: KeyOrString<T>):  IAssertQueryable<T>;
    isArray(key: KeyOrString<T>):  IAssertQueryable<T>;
    isFunction(key: KeyOrString<T>):  IAssertQueryable<T>;
    isObject(key: KeyOrString<T>):  IAssertQueryable<T>;
    isString(key: KeyOrString<T>):  IAssertQueryable<T>;
    isNumber(key: KeyOrString<T>):  IAssertQueryable<T>;
    isDate(key: KeyOrString<T>):  IAssertQueryable<T>;
    isTrue(key: KeyOrString<T>):  IAssertQueryable<T>;
    isFalse(key: KeyOrString<T>):  IAssertQueryable<T>;
    isToday(key: KeyOrString<T>, date: Date|number|string):  IAssertQueryable<T>;
    beforeAt(key: KeyOrString<T>, date: Date|number|string):  IAssertQueryable<T>;
    afterAt(key: KeyOrString<T>, date: Date|number|string):  IAssertQueryable<T>;
    ago(key: KeyOrString<T>, date: Date|number|string, seconds: number):  IAssertQueryable<T>;
}