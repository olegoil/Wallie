"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base58_1 = require("./libs/base58");
var crypto_1 = require("./utils/crypto");
exports.default = {
    getAddressFromPublicKey: function (publicKey) {
        var publicKeyBytes = base58_1.default.decode(publicKey);
        return crypto_1.default.buildRawAddress(publicKeyBytes);
    }
};
//# sourceMappingURL=tools.js.map