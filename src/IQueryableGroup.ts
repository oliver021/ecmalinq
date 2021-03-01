import { IQueryable, IQueryableControl } from './IQueryable';

export type GroupElement<TKey, TValue> = {groupKey:TKey, records: IQueryable<TValue>};

export interface IQueryableGroup<T,K> extends IQueryableControl<GroupElement<T,K>>{

}