// const isValid =  // verify
const { secp256k1 } = require("ethereum-cryptography/secp256k1.js");
const { toHex } = require("ethereum-cryptography/utils.js");
const SHA256 = require("crypto-js/sha256");

const verifySignature = (signature, pubKey) => {
    const messageHash = SHA256("signature hash message").toString();
    return secp256k1.verify(signature, messageHash, pubKey);
};

module.exports = verifySignature;

