export interface IAsyncProvider<T> extends AsyncIterable<T>{
    close(): void;
    fails(): boolean;
    catch(): unknown;
}