export declare function randomNum(min: number, max: number): number;
export declare function toIterator<T>(data: Iterator<T, any, undefined>): Iterable<T>;
export declare function toArray<T>(data: Iterator<T, any, undefined>): T[];
export declare function matchValues<T extends {
    [key: string]: any;
}>(target: T, check: Partial<T>): boolean;
export declare function union<T = any>(...items: Iterable<T>[]): Iterable<T>;
declare type ResolverCascade<K, T> = (ctx: K, reset: (ctx: K) => void, resolve: (result: T) => void) => void;
export declare function switchReduce<T, K>(initial: K, _default: T, func: ResolverCascade<K, T>): T;
export {};
