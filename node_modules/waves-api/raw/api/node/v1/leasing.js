"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Transactions_1 = require("../../../classes/Transactions");
var request_1 = require("../../../utils/request");
var remap_1 = require("../remap");
var fetch = request_1.createFetchWrapper(0 /* NODE */, 0 /* V1 */, request_1.processJSON);
var remapLeaseTransaction = remap_1.createRemapper({
    transactionType: null
});
var remapCancelLeasingTransaction = remap_1.createRemapper({
    transactionType: null,
    transactionId: 'txId'
});
exports.default = {
    lease: request_1.wrapTransactionRequest(Transactions_1.default.LeaseTransaction, remapLeaseTransaction, function (postParams) {
        return fetch('/leasing/broadcast/lease', postParams);
    }),
    cancelLeasing: request_1.wrapTransactionRequest(Transactions_1.default.CancelLeasingTransaction, remapCancelLeasingTransaction, function (postParams) {
        return fetch('/leasing/broadcast/cancel', postParams);
    })
};
//# sourceMappingURL=leasing.js.map