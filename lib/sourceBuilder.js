"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceBuilder = void 0;
const queryable_1 = require("./queryable");
class SourceBuilder {
    constructor() {
        this.actions = [];
        this.source = [];
    }
    build(builder) {
        this.actions.push(builder);
    }
    store(arg) {
        this.source.push(arg);
        return this;
    }
    commit() {
        this.actions.forEach(run => run.call(null, new queryable_1.Queryable(this.source), null));
    }
    flush(exec = true) {
        if (exec) {
            this.commit();
        }
        this.source = [];
    }
}
exports.SourceBuilder = SourceBuilder;
//# sourceMappingURL=sourceBuilder.js.map