import { InteractiveQuery } from "./InteractiveQuery";
import { IQueryable, IQueryableControl, QueryableDefaultReturn } from "./IQueryable";
import { Action, Func, Predicate } from "./signtures";
export interface IQueryableAsync<T = any, _TFluent = QueryableDefaultReturn<T>> extends IQueryableControl<T, _TFluent>, AsyncIterable<T> {
    anyAsync(): boolean;
    allAsync(): boolean;
    containsAsync(element: T): boolean;
    containsAsync(predicate: Predicate<T>): boolean;
    countAsync(): Promise<number>;
    firstAsync(): Promise<T>;
    singleAsync(predicate: Predicate<T>, _def?: T): Promise<T | null>;
    lastAsync(): Promise<T>;
    randomAsync(): Promise<T | null>;
    toArrayAsync(): Promise<T[]>;
    toArrayColumnAsync<K>(columnSelect: Func<T, K>): Promise<K[]>;
    toJson(idented: boolean): Promise<string>;
    toSetAsync(): Promise<Set<T>>;
    toMapAsync(mapper: (arg: T) => [string, T]): Promise<Map<string, T>>;
    forAllAsync(action: Action<T>): Promise<void>;
    pollAsync(evaluator: (arg: T) => number, forMax?: boolean): Promise<T | null>;
    toInteractiveAsync(): Promise<InteractiveQuery<T>>;
    sync(): Promise<IQueryable<T>>;
}
