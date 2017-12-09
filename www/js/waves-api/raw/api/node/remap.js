"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handleAlias(original) {
    if (original.slice(0, 6) === 'alias:') {
        return original.slice(8); // Mind the network byte characters
    }
    else {
        return original;
    }
}
exports.handleAlias = handleAlias;
function handleAssetId(original) {
    if (original === 'WAVES') {
        return '';
    }
    else {
        return original;
    }
}
exports.handleAssetId = handleAssetId;
function handleRecipient(original) {
    if (original.slice(0, 8) === 'address:') {
        return original.slice(8);
    }
    else {
        return original;
    }
}
exports.handleRecipient = handleRecipient;
function createRemapper(rules) {
    return function (data) {
        return Object.keys(data).reduce(function (result, key) {
            var rule = rules[key];
            if (typeof rule === 'function') {
                // Process with a function
                result[key] = rule(data[key]);
            }
            else if (typeof rule === 'string') {
                // Rename a field
                result[rule] = data[key];
            }
            else if (rule !== null) {
                // Leave as is
                result[key] = data[key];
            }
            return result;
        }, {});
    };
}
exports.createRemapper = createRemapper;
//# sourceMappingURL=remap.js.map