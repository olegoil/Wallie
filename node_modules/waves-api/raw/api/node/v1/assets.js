"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Transactions_1 = require("../../../classes/Transactions");
var request_1 = require("../../../utils/request");
var remap_1 = require("../remap");
var fetch = request_1.createFetchWrapper(0 /* NODE */, 0 /* V1 */, request_1.processJSON);
var remapIssueTransaction = remap_1.createRemapper({
    transactionType: null,
    precision: 'decimals'
});
var remapTransferTransaction = remap_1.createRemapper({
    transactionType: null,
    recipient: remap_1.handleRecipient,
    assetId: remap_1.handleAssetId,
    feeAssetId: remap_1.handleAssetId
});
var remapReissueTransaction = remap_1.createRemapper({
    transactionType: null
});
var remapBurnTransaction = remap_1.createRemapper({
    transactionType: null
});
exports.default = {
    balances: function (address) {
        return fetch("/assets/balance/" + address);
    },
    balance: function (address, assetId) {
        return fetch("/assets/balance/" + address + "/" + assetId);
    },
    distribution: function (assetId) {
        return fetch("/assets/" + assetId + "/distribution");
    },
    issue: request_1.wrapTransactionRequest(Transactions_1.default.IssueTransaction, remapIssueTransaction, function (postParams) {
        return fetch('/assets/broadcast/issue', postParams);
    }),
    transfer: request_1.wrapTransactionRequest(Transactions_1.default.TransferTransaction, remapTransferTransaction, function (postParams) {
        return fetch('/assets/broadcast/transfer', postParams);
    }),
    reissue: request_1.wrapTransactionRequest(Transactions_1.default.ReissueTransaction, remapReissueTransaction, function (postParams) {
        return fetch('/assets/broadcast/reissue', postParams);
    }),
    burn: request_1.wrapTransactionRequest(Transactions_1.default.BurnTransaction, remapBurnTransaction, function (postParams) {
        return fetch('/assets/broadcast/burn', postParams);
    })
};
//# sourceMappingURL=assets.js.map