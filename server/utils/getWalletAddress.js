const { secp256k1 } = require("ethereum-cryptography/secp256k1.js");
const { toHex } = require("ethereum-cryptography/utils.js");
const getWalletAddress = (publicKey) => {
    return `0x${publicKey.slice(-40)}`;
};

module.exports = getWalletAddress;

