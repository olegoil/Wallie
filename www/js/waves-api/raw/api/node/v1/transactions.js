"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = require("../../../utils/request");
var fetch = request_1.createFetchWrapper(0 /* NODE */, 0 /* V1 */, request_1.processJSON);
exports.default = {
    get: function (id) {
        return fetch("/transactions/info/" + id);
    },
    getList: function (address, limit) {
        if (limit === void 0) { limit = 50; }
        return fetch("/transactions/address/" + address + "/limit/" + limit);
    },
    utxSize: function () {
        return fetch('/transactions/unconfirmed/size');
    },
    utxGet: function (id) {
        return fetch("/transactions/unconfirmed/info/" + id);
    },
    utxGetList: function () {
        return fetch('/transactions/unconfirmed');
    }
};
//# sourceMappingURL=transactions.js.map