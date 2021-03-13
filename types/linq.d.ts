import { IQueryable } from './IQueryable';
import { Queryable } from './queryable';
declare function from<T>(collection: T[]): IQueryable<T>;
declare function from<T>(collection: Set<T>): IQueryable<T>;
declare function from<T>(collection: Iterable<T>): IQueryable<T>;
export { from };
export declare function range(start: number, end: number, product?: number): Generator<number, void, unknown>;
export declare function create<T>(creator: (next: (arg: T) => number) => void): Queryable<T>;
export declare function createAsync<T, TRes>(creator: (next: (arg: T) => number) => Promise<TRes>): Promise<Queryable<T>>;
