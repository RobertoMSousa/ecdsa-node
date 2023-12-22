const { secp256k1 } = require("ethereum-cryptography/secp256k1.js");
const { toHex } = require("ethereum-cryptography/utils.js");
const SHA256 = require("crypto-js/sha256");

const recoverWalletAddress = (signature) => {
  const messageHash = SHA256("signature hash message").toString();
  
  const recoverPublicKeyPoint = signature
    .recoverPublicKey(messageHash)
    .toRawBytes();
  

  // convert to hex
  const recoverPublicKey = toHex(recoverPublicKeyPoint); // false for uncompressed
  
  return recoverPublicKey;
};

module.exports = recoverWalletAddress;

