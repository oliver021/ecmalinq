import { IQueryable } from './IQueryable';
export declare type QueryActions<T, P = T> = (query: IQueryable<T>, emmit: (ev: string, payload: P) => void) => void;
export declare class SourceBuilder<TRecord> {
    private actions;
    private source;
    build(builder: QueryActions<TRecord>): void;
    store(arg: TRecord): this;
    commit(): void;
    flush(exec?: boolean): void;
}
