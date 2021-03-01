import { IQueryable } from './IQueryable';
import { Queryable } from './queryable';

/**
 * @function form<T>
 * @description The helper to create a query
 * @param collection - An array with elements of query
 */
function from<T>(collection: T[]): IQueryable<T>;

/**
 * @function form<T>
 * @description The helper to create a query
 * @param collection - A set with elements of query
 */
// tslint:disable-next-line: unified-signatures
function from<T>(collection: Set<T>): IQueryable<T>;

/**
 * @function form<T>
 * @description The helper to create a query
 * @param collection - An iterable with elements of query
 */
// tslint:disable-next-line: unified-signatures
function from<T>(collection: Iterable<T>): IQueryable<T>;

/**
 * this is an implemention of all overload of 'from'
 * @param elms any elements to create a query
 * @return the query base on generic type of the overload
 */
function from(elms: any): any{
    if(Array.isArray(elms) || elms instanceof Set){
        return new Queryable<any>(elms);
    }else if(typeof elms[Symbol.iterator] === 'function'){
        return new Queryable<any>(elms);
    }
    throw new Error("not was posiible resolve a query");
}

// export all overloads
export { from };

/**
 * @function range
 * @param {number} start - the first number to begin range
 * @param {number} end - the final number where the range is finished
 * @param {number} product the factor to determine the progress
 * @description simple helper to create a range iterable
 * @returns {Iterable<number>}
 */
export function * range(start: number, end: number, product = 1){
    for (let index = start; index <= end; index += product) {
        yield index;
    }
}

/**
 * @function create<T>
 * @param {(next: (arg: T) => number)=>void} creator - the basic fucntion that build a new query
 * by imperative way
 * @returns a new query
 */
export function create<T>(creator: (next: (arg: T) => number)=>void){
    const storage: T[] = [];
    creator.call(null, element => storage.push(element));
    return new Queryable<T>(storage);
}