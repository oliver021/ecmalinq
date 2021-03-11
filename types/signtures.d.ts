export declare type SortResult = 1 | -1 | 0;
export declare type Predicate<T> = (arg: T) => boolean;
export declare type PredeicateIndex<T> = (arg: T, index: number) => boolean;
export declare type Selector<T, K> = (arg: T) => K;
export declare type Rtrn<T> = () => T;
export declare type Action<T> = (arg: T) => void;
export declare type Func<T, K> = (arg: T) => K;
export declare type Sort<T> = (arg: T, arg2: T) => SortResult;
export declare type Reducer<T, K> = (element: T, current: K) => K;
export declare type FreeFunc<T> = Func<T, any>;
export declare type KeyOrString<T> = keyof T | string;
export declare type SortingParameters<T> = {
    sort: Func<T, any>;
    desc: boolean;
};
