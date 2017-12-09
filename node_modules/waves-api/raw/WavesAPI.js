"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Currency_1 = require("./classes/Currency");
var Seed_1 = require("./classes/Seed");
var Transactions_1 = require("./classes/Transactions");
var crypto_1 = require("./utils/crypto");
var request = require("./utils/request");
var NodeAPI = require("./api/node/index");
var constants = require("./constants");
var config_1 = require("./config");
var tools_1 = require("./tools");
var WavesAPI = (function () {
    function WavesAPI(initialConfiguration) {
        this.Currency = Currency_1.default;
        this.Seed = Seed_1.default;
        this.Transactions = Transactions_1.default;
        this.config = config_1.default;
        this.constants = constants;
        this.crypto = crypto_1.default;
        this.request = request;
        this.tools = tools_1.default;
        this.API = {
            Node: {
                v1: NodeAPI.v1
            }
        };
        if (this instanceof WavesAPI) {
            this.config.set(initialConfiguration);
            if (WavesAPI._instance === null) {
                WavesAPI._instance = this;
            }
            else {
                return WavesAPI._instance;
            }
        }
        else {
            return new WavesAPI(initialConfiguration);
        }
    }
    return WavesAPI;
}());
function create(config) {
    return new WavesAPI(config);
}
exports.create = create;
exports.MAINNET_CONFIG = constants.DEFAULT_MAINNET_CONFIG;
exports.TESTNET_CONFIG = constants.DEFAULT_TESTNET_CONFIG;
//# sourceMappingURL=WavesAPI.js.map