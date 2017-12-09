"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = Object.create(null);
exports.default = {
    getNetworkByte: function () {
        return config.networkByte;
    },
    getNodeAddress: function () {
        return config.nodeAddress;
    },
    getMatcherAddress: function () {
        return config.matcherAddress;
    },
    getMinimumSeedLength: function () {
        return config.minimumSeedLength;
    },
    set: function (newConfig) {
        Object.keys(newConfig).forEach(function (key) {
            config[key] = newConfig[key];
        });
    }
};
//# sourceMappingURL=config.js.map