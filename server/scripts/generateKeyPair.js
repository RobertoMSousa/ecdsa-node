const { secp256k1 } = require("ethereum-cryptography/secp256k1.js");
const { toHex } = require("ethereum-cryptography/utils.js");
const SHA256 = require("crypto-js/sha256");


const privateKey = toHex(secp256k1.utils.randomPrivateKey());

const publicKey = toHex(secp256k1.getPublicKey(privateKey));

const walletAddress = publicKey.slice(-40);

const messageHash = SHA256("signature hash message").toString();

const signature = secp256k1.sign(messageHash, privateKey);

const signatureString = signature.toCompactHex();

console.log("🚀 walletAddress:", walletAddress);
console.log("🚀 publicKey:", publicKey);
console.log("🚀 privateKey:", privateKey);
console.log("🚀 signature:", signature);
console.log("🚀 signatureString:", signatureString);
