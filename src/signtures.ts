export type SortResult = 1 | -1 |0;

export type Predicate<T> = (arg: T) => boolean;
export type PredeicateIndex<T> = (arg: T, index: number) => boolean;
export type Selector<T,K> = (arg: T) => K;
export type Rtrn<T> = () => T;
export type Action<T> = (arg:T) => void;
export type Func<T, K> = (arg:T) => K;
export type Sort<T> = (arg:T, arg2:T) => SortResult;
export type Reducer<T, K> = (element: T, current: K) => K;
export type FreeFunc<T> = Func<T,any>;
export type KeyOrString<T> = keyof T | string;
export type SortingParameters<T> = {
    sort: Func<T, any>;
    desc: boolean;
};
