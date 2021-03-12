import { IQueryable } from './IQueryable';
import { KeyOrString } from './signtures';
export interface IAsertControl<TRecord> {
    equal(key: KeyOrString<TRecord>, value: any): this;
    greather(key: KeyOrString<TRecord>, value: number): this;
    greatherEqual(key: KeyOrString<TRecord>, value: number): this;
    less(key: KeyOrString<TRecord>, value: number): this;
    lessEqual(key: KeyOrString<TRecord>, value: number): this;
    betweenAt(key: KeyOrString<TRecord>, start: number, end: number): this;
    in(key: KeyOrString<TRecord>, ...value: any[]): this;
    regex(key: KeyOrString<TRecord>, expression: string | RegExp): this;
    same(key: KeyOrString<TRecord>, key2: KeyOrString<TRecord>): this;
    isArray(key: KeyOrString<TRecord>): this;
    isFunction(key: KeyOrString<TRecord>): this;
    isObject(key: KeyOrString<TRecord>): this;
    isString(key: KeyOrString<TRecord>): this;
    isNumber(key: KeyOrString<TRecord>): this;
    isDate(key: KeyOrString<TRecord>): this;
    isTrue(key: KeyOrString<TRecord>): this;
    isFalse(key: KeyOrString<TRecord>): this;
    isToday(key: KeyOrString<TRecord>, date: Date | number | string): this;
    beforeAt(key: KeyOrString<TRecord>, date: Date | number | string): this;
    afterAt(key: KeyOrString<TRecord>, date: Date | number | string): this;
    ago(key: KeyOrString<TRecord>, date: Date | number | string, seconds: number): this;
    agoOne(key: KeyOrString<TRecord>, date: Date | number | string, mesure: "second" | "minute" | "hour" | "day" | "week"): this;
}
export interface IAssertQueryable<TRecord> extends Omit<IQueryable<TRecord>, "assertMode">, IAsertControl<TRecord> {
}
