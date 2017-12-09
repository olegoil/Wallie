"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CryptoJS = require("crypto-js");
var axlsign_1 = require("../libs/axlsign");
var base58_1 = require("../libs/base58");
var blake = require("../libs/blake2b");
var converters_1 = require("../libs/converters");
var secure_random_1 = require("../libs/secure-random");
var sha3_1 = require("../libs/sha3");
var concat_1 = require("./concat");
var constants = require("../constants");
var config_1 = require("../config");
function sha256(input) {
    var bytes;
    if (typeof input === 'string') {
        bytes = converters_1.default.stringToByteArray(input);
    }
    else {
        bytes = input;
    }
    var wordArray = converters_1.default.byteArrayToWordArrayEx(Uint8Array.from(bytes));
    var resultWordArray = CryptoJS.SHA256(wordArray);
    return converters_1.default.wordArrayToByteArrayEx(resultWordArray);
}
function blake2b(input) {
    return blake.blake2b(input, null, 32);
}
function keccak(input) {
    return sha3_1.keccak256.array(input);
}
function hashChain(input) {
    return keccak(blake2b(input));
}
function buildSeedHash(seedBytes) {
    var nonce = new Uint8Array(converters_1.default.int32ToBytes(constants.INITIAL_NONCE, true));
    var seedBytesWithNonce = concat_1.concatUint8Arrays(nonce, seedBytes);
    var seedHash = hashChain(seedBytesWithNonce);
    return sha256(seedHash);
}
function strengthenPassword(password, rounds) {
    if (rounds === void 0) { rounds = 5000; }
    while (rounds--)
        password = converters_1.default.byteArrayToHexString(sha256(password));
    return password;
}
exports.default = {
    buildTransactionSignature: function (dataBytes, privateKey) {
        if (!dataBytes || !(dataBytes instanceof Uint8Array)) {
            throw new Error('Missing or invalid data');
        }
        if (!privateKey || typeof privateKey !== 'string') {
            throw new Error('Missing or invalid private key');
        }
        var privateKeyBytes = base58_1.default.decode(privateKey);
        if (privateKeyBytes.length !== constants.PRIVATE_KEY_LENGTH) {
            throw new Error('Invalid public key');
        }
        var signature = axlsign_1.default.sign(privateKeyBytes, dataBytes, secure_random_1.default.randomUint8Array(64));
        return base58_1.default.encode(signature);
    },
    buildTransactionId: function (dataBytes) {
        if (!dataBytes || !(dataBytes instanceof Uint8Array)) {
            throw new Error('Missing or invalid data');
        }
        var hash = blake2b(dataBytes);
        return base58_1.default.encode(hash);
    },
    buildKeyPair: function (seed) {
        if (!seed || typeof seed !== 'string') {
            throw new Error('Missing or invalid seed phrase');
        }
        var seedBytes = Uint8Array.from(converters_1.default.stringToByteArray(seed));
        var seedHash = buildSeedHash(seedBytes);
        var keys = axlsign_1.default.generateKeyPair(seedHash);
        return {
            privateKey: keys.private,
            publicKey: keys.public
        };
    },
    buildRawAddress: function (publicKeyBytes) {
        if (!publicKeyBytes || publicKeyBytes.length !== constants.PUBLIC_KEY_LENGTH || !(publicKeyBytes instanceof Uint8Array)) {
            throw new Error('Missing or invalid public key');
        }
        var prefix = Uint8Array.from([constants.ADDRESS_VERSION, config_1.default.getNetworkByte()]);
        var publicKeyHashPart = Uint8Array.from(hashChain(publicKeyBytes).slice(0, 20));
        var rawAddress = concat_1.concatUint8Arrays(prefix, publicKeyHashPart);
        var addressHash = Uint8Array.from(hashChain(rawAddress).slice(0, 4));
        return base58_1.default.encode(concat_1.concatUint8Arrays(rawAddress, addressHash));
    },
    encryptSeed: function (seed, password, encryptionRounds) {
        if (!seed || typeof seed !== 'string') {
            throw new Error('Seed is required');
        }
        if (!password || typeof password !== 'string') {
            throw new Error('Password is required');
        }
        password = strengthenPassword(password, encryptionRounds);
        return CryptoJS.AES.encrypt(seed, password).toString();
    },
    decryptSeed: function (encryptedSeed, password, encryptionRounds) {
        if (!encryptedSeed || typeof encryptedSeed !== 'string') {
            throw new Error('Encrypted seed is required');
        }
        if (!password || typeof password !== 'string') {
            throw new Error('Password is required');
        }
        password = strengthenPassword(password, encryptionRounds);
        var hexSeed = CryptoJS.AES.decrypt(encryptedSeed, password);
        return converters_1.default.hexStringToString(hexSeed.toString());
    },
    generateRandomUint32Array: function (length) {
        if (!length || length < 0) {
            throw new Error('Missing or invalid array length');
        }
        var a = secure_random_1.default.randomUint8Array(length);
        var b = secure_random_1.default.randomUint8Array(length);
        var result = new Uint32Array(length);
        for (var i = 0; i < length; i++) {
            var hash = converters_1.default.byteArrayToHexString(sha256("" + a[i] + b[i]));
            var randomValue = parseInt(hash.slice(0, 13), 16);
            result.set([randomValue], i);
        }
        return result;
    }
};
//# sourceMappingURL=crypto.js.map