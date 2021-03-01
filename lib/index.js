"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queryable = exports.InteractiveQuery = void 0;
var InteractiveQuery_1 = require("./InteractiveQuery");
Object.defineProperty(exports, "InteractiveQuery", { enumerable: true, get: function () { return InteractiveQuery_1.InteractiveQuery; } });
var queryable_1 = require("./queryable");
Object.defineProperty(exports, "Queryable", { enumerable: true, get: function () { return queryable_1.Queryable; } });
__exportStar(require("./signtures"), exports);
__exportStar(require("./linq"), exports);
//# sourceMappingURL=index.js.map