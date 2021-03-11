import { Predicate } from './signtures';
export declare class InteractiveQuery<T> {
    static from<T>(source: Iterable<T>): InteractiveQuery<T>;
    private source;
    constructor(_source: Iterator<T>);
    fetch(): T;
    fetchOrNull(): T | null;
    fetchOrDefaukt<D>(_def: D): T | D;
    require(length: number): Generator<IteratorYieldResult<T>, void, unknown>;
    fetchWhile(predicate: Predicate<T>): Generator<T, void, unknown>;
    fetchUntil(predicate: Predicate<T>): Generator<T, void, unknown>;
}
