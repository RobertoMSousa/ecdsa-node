const { secp256k1 } = require("ethereum-cryptography/secp256k1.js");
const { toHex } = require("ethereum-cryptography/utils.js");
const SHA256 = require("crypto-js/sha256");

const privateKey = toHex(secp256k1.utils.randomPrivateKey());
// secp256k1.Signature.re

const publicKey = toHex(secp256k1.getPublicKey(privateKey));

const walletAddress = publicKey.slice(-40);

const messageHash = SHA256("").toString();

const signature = secp256k1.sign(messageHash, privateKey);

const signatureString = {
  r: signature.r.toString(16),
  s: signature.s.toString(16),
  recovery: signature.recovery
};

console.log("🚀 walletAddress:", walletAddress);
console.log("🚀 publicKey:", publicKey);
console.log("🚀 privateKey:", privateKey);
console.log("🚀 signature:", JSON.stringify(signatureString));


// recover public key
const recoverPublicKeyPoint = signature.recoverPublicKey(messageHash).toRawBytes();
console.log("🚀  roberto --  ~ file: generateKeyPair.js:30 ~ recoverPublicKeyPoint:", recoverPublicKeyPoint)

// convert to hex
const recoverPublicKey = toHex(recoverPublicKeyPoint); // false for uncompressed
console.log("🚀  roberto --  ~ file: generateKeyPair.js:34 ~ recoverPublicKey:", recoverPublicKey)
