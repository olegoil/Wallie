"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fetch_1 = require("../libs/fetch");
var config_1 = require("../config");
var POST_TEMPLATE = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
    }
};
var key = function (product, version) {
    return product + "/" + version;
};
var hostResolvers = (_a = {},
    _a[key(0 /* NODE */, 0 /* V1 */)] = function () { return config_1.default.getNodeAddress(); },
    _a[key(1 /* MATCHER */, 0 /* V1 */)] = function () { return config_1.default.getMatcherAddress(); },
    _a);
function normalizePath(path) {
    return ("/" + path).replace(/\/+/g, '/').replace(/\/$/, '');
}
exports.normalizePath = normalizePath;
function processJSON(jsonReadableStream) {
    return jsonReadableStream.json();
}
exports.processJSON = processJSON;
function createFetchWrapper(product, version, pipe) {
    var resolveHost = hostResolvers[key(product, version)];
    return function (path, options) {
        var url = resolveHost() + normalizePath(path);
        var request = fetch_1.default(url, options);
        if (pipe) {
            return request.then(pipe);
        }
        else {
            return request;
        }
    };
}
exports.createFetchWrapper = createFetchWrapper;
function wrapTransactionRequest(TransactionConstructor, remapFunction, callback) {
    return function (data, keyPair) {
        var transaction = new TransactionConstructor(__assign({}, data, { senderPublicKey: keyPair.publicKey }));
        return transaction.prepareForAPI(keyPair.privateKey)
            .then(remapFunction)
            .then(function (tx) {
            return callback(__assign({}, POST_TEMPLATE, { body: JSON.stringify(tx) }));
        });
    };
}
exports.wrapTransactionRequest = wrapTransactionRequest;
var _a;
//# sourceMappingURL=request.js.map