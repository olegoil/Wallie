"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Transactions_1 = require("../../../classes/Transactions");
var request_1 = require("../../../utils/request");
var remap_1 = require("../remap");
var fetch = request_1.createFetchWrapper(0 /* NODE */, 0 /* V1 */, request_1.processJSON);
var remapCreateAlias = remap_1.createRemapper({
    transactionType: null,
    alias: remap_1.handleAlias
});
exports.default = {
    byAlias: function (alias) {
        return fetch("/alias/by-alias/" + alias);
    },
    byAddress: function (address) {
        return fetch("/alias/by-address/" + address);
    },
    createAlias: request_1.wrapTransactionRequest(Transactions_1.default.CreateAliasTransaction, remapCreateAlias, function (postParams) {
        return fetch('/alias/broadcast/create', postParams);
    })
};
//# sourceMappingURL=aliases.js.map