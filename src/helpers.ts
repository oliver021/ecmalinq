
/**
 * @function randomNum
 * @param {number} min max to resolve random number
 * @param {number} max max to resolve random number
 * @return a new random number calculated by function
 */
export function randomNum(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

/**
 * @function toIterator
 * @param {Iterator<T, any, undefined>} data the target data as iterator
 * @returns new Iterator
 */
export function * toIterator<T>(data: Iterator<T, any, undefined>): Iterable<T>{
    let current = data.next();
    while(current.done === false){
        yield current.value;
        current = data.next();
    }
}

/**
 * @function toIterator
 * @param {Iterator<T, any, undefined>} data the target data as iterator
 * @returns new Iterator
 */
export function toArray<T>(data: Iterator<T, any, undefined>): T[]{
    const result: T[] = [];
    let current = data.next();

    while(current.done === false){
        result.push(current.value);
        current = data.next();
    }
    return result;
}

/**
 * @function matchValues
 * @description Determine if the target match with checks values
 * @param  {T} target
 * @param  {Partial<T>} check
 * @returns boolean
 */
export function matchValues<T extends {[key:string]:any}>(target: T, check: Partial<T>): boolean{
    for (const key of Object.keys(check)) {
        // tslint:disable-next-line: strict-comparisons
        if(target[key] !== undefined && target[key] !== check[key]){
            return false;
        }
    }
    return true;
}

/**
 * @fucntion union
 * @param {Iterable<T>[]} items1 - the iteratos to concat
 * @description concat two or more iterators
 */
export function union<T = any>(...items: Iterable<T>[]): Iterable<T>{

    if(items.length < 2){
        throw new Error("union is not necesary, require more than one source");
    }

    return {
        *[Symbol.iterator](){
            // tslint:disable-next-line: prefer-for-of
            for (let index = 0; index < items.length; index++) {
                const element = items[index];
                for (const current of element) {
                    yield current;
                }
            }
        }
    }
}

type ResolverCascade<K, T> = (ctx: K, reset: (ctx: K) => void, resolve: (result: T) => void) => void;

/**
 * @function switchReduce
 * @param {K} initial the basic initial value
 * @param {ResolverCascade<K, T>} func the main handler to resolve cascade method
 * @returns {T} a the resolve value
 */
export function switchReduce<T, K>(initial: K, _default:T, func: ResolverCascade<K, T>): T{
    let currentContext = initial;
    let result: T = _default;
    let again: boolean;
    do{
        again = false;
        func.call(null, currentContext, newCtx =>{
        currentContext = newCtx;
        again = true;
        }, value =>{
            result = value;
        });
    } while(again);
    return result;
}