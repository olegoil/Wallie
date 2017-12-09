"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base58_1 = require("../libs/base58");
var crypto_1 = require("../utils/crypto");
var config_1 = require("../config");
var seedDictionary_1 = require("../seedDictionary");
function generateNewSeed(length) {
    var random = crypto_1.default.generateRandomUint32Array(length);
    var wordCount = seedDictionary_1.default.length;
    var phrase = [];
    for (var i = 0; i < length; i++) {
        var wordIndex = random[i] % wordCount;
        phrase.push(seedDictionary_1.default[wordIndex]);
    }
    random.set(new Uint8Array(random.length));
    return phrase.join(' ');
}
function encryptSeedPhrase(seedPhrase, password, encryptionRounds) {
    if (encryptionRounds === void 0) { encryptionRounds = 5000; }
    if (password && password.length < 8) {
        console.warn('Your password may be too weak');
    }
    if (encryptionRounds < 1000) {
        console.warn('Encryption rounds may be too few');
    }
    if (seedPhrase.length < config_1.default.getMinimumSeedLength()) {
        throw new Error('The seed phrase you are trying to encrypt is too short');
    }
    return crypto_1.default.encryptSeed(seedPhrase, password, encryptionRounds);
}
function decryptSeedPhrase(encryptedSeedPhrase, password, encryptionRounds) {
    if (encryptionRounds === void 0) { encryptionRounds = 5000; }
    var wrongPasswordMessage = 'The password is wrong';
    var phrase;
    try {
        phrase = crypto_1.default.decryptSeed(encryptedSeedPhrase, password, encryptionRounds);
    }
    catch (e) {
        throw new Error(wrongPasswordMessage);
    }
    if (phrase === '' || phrase.length < config_1.default.getMinimumSeedLength()) {
        throw new Error(wrongPasswordMessage);
    }
    return phrase;
}
var Seed = (function () {
    function Seed(phrase) {
        var keys = crypto_1.default.buildKeyPair(phrase);
        this.phrase = phrase;
        this.address = crypto_1.default.buildRawAddress(keys.publicKey);
        this.keyPair = {
            privateKey: base58_1.default.encode(keys.privateKey),
            publicKey: base58_1.default.encode(keys.publicKey)
        };
        Object.freeze(this);
        Object.freeze(this.keyPair);
    }
    Seed.prototype.encrypt = function (password, encryptionRounds) {
        return encryptSeedPhrase(this.phrase, password, encryptionRounds);
    };
    return Seed;
}());
exports.default = {
    create: function (words) {
        if (words === void 0) { words = 15; }
        var phrase = generateNewSeed(words);
        var minimumSeedLength = config_1.default.getMinimumSeedLength();
        if (phrase.length < minimumSeedLength) {
            // If you see that error you should increase the number of words in the generated seed
            throw new Error("The resulted seed length is less than the minimum length (" + minimumSeedLength + ")");
        }
        return new Seed(phrase);
    },
    fromExistingPhrase: function (phrase) {
        if (phrase.length < config_1.default.getMinimumSeedLength()) {
            throw new Error('Your seed length is less than allowed in config');
        }
        return new Seed(phrase);
    },
    encryptSeedPhrase: encryptSeedPhrase,
    decryptSeedPhrase: decryptSeedPhrase
};
//# sourceMappingURL=Seed.js.map