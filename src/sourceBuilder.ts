import { IQueryable } from './IQueryable';
import { Queryable } from './queryable';

export type QueryActions<T, P = T> = (query: IQueryable<T>, emmit:(ev: string, payload: P) => void) => void;

/**
 * This is basic helper to create agil and complex data flow
 * By this class you can create queries thta execute every time
 * Through "commits" and "bufferSource" you can execute queries
 * this class work as query factory by commits
 * use "on" to fork the data flow
 * this is class help with event data
 * @class
 * @description The class to helper to create record to send a query
 */
export class SourceBuilder<TRecord>{

    /**
     * @property actions
     * @access private
     */
    private actions: QueryActions<TRecord>[] = [];

    /**
     * @property source
     * @access private
     */
    private source: TRecord[] = [];

    /**
     * @method build
     * @param {QueryActions<TRecord>} builder - create a builder for query flow
     */
    build(builder: QueryActions<TRecord>){
        this.actions.push(builder);
    }
    /**
     * @param  {TRecord} arg
     */
    store(arg: TRecord): this{
        this.source.push(arg);
        return this;
    }
    /**
     * @method commit
     * @description dispatch the queries by the accumulate sources or records
     */
    commit(){
        this.actions.forEach(run => run.call(null, new Queryable(this.source), this.emitter));
    }

    /**
     * @method flush
     * @param {boolean} exec if is true then execute the queries, true is default value
     * @description clean the source and execute queries if exec is true
     * @returns {void}
     */
    flush(exec = true){
       if(exec){
        this.commit();
       }
       this.source = [];
    }

    // tslint:disable-next-line: no-empty
    private emitter(ev: string){
    }
}