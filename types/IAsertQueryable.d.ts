import { KeyOrString } from './signtures';
import { IQueryable } from './IQueryable';
export interface IAssertControl<TRecord> {
    equal(key: KeyOrString<TRecord>, value: any): IAssertQueryable<TRecord>;
    greather(key: KeyOrString<TRecord>, value: number): IAssertQueryable<TRecord>;
    greatherEqual(key: KeyOrString<TRecord>, value: number): IAssertQueryable<TRecord>;
    less(key: KeyOrString<TRecord>, value: number): IAssertQueryable<TRecord>;
    lessEqual(key: KeyOrString<TRecord>, value: number): IAssertQueryable<TRecord>;
    betweenAt(key: KeyOrString<TRecord>, start: number, end: number): IAssertQueryable<TRecord>;
    in(key: KeyOrString<TRecord>, ...value: any[]): IAssertQueryable<TRecord>;
    regex(key: KeyOrString<TRecord>, expression: string | RegExp): IAssertQueryable<TRecord>;
    same(key: KeyOrString<TRecord>, key2: KeyOrString<TRecord>): IAssertQueryable<TRecord>;
    isArray(key: KeyOrString<TRecord>): IAssertQueryable<TRecord>;
    isFunction(key: KeyOrString<TRecord>): IAssertQueryable<TRecord>;
    isObject(key: KeyOrString<TRecord>): IAssertQueryable<TRecord>;
    isString(key: KeyOrString<TRecord>): IAssertQueryable<TRecord>;
    isNumber(key: KeyOrString<TRecord>): IAssertQueryable<TRecord>;
    isDate(key: KeyOrString<TRecord>): IAssertQueryable<TRecord>;
    isTrue(key: KeyOrString<TRecord>): IAssertQueryable<TRecord>;
    isFalse(key: KeyOrString<TRecord>): IAssertQueryable<TRecord>;
    isToday(key: KeyOrString<TRecord>, date: Date | number | string): IAssertQueryable<TRecord>;
    beforeAt(key: KeyOrString<TRecord>, date: Date | number | string): IAssertQueryable<TRecord>;
    afterAt(key: KeyOrString<TRecord>, date: Date | number | string): IAssertQueryable<TRecord>;
    ago(key: KeyOrString<TRecord>, date: Date | number | string, seconds: number): IAssertQueryable<TRecord>;
    agoOne(key: KeyOrString<TRecord>, date: Date | number | string, mesure: "second" | "minute" | "hour" | "day" | "week"): IAssertQueryable<TRecord>;
}
export interface IAssertQueryable<TRecord> extends Omit<IQueryable<TRecord, IAssertQueryable<TRecord>>, "assertMode">, IAssertControl<TRecord> {
}
