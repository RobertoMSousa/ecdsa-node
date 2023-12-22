const { secp256k1 } = require("ethereum-cryptography/secp256k1.js");


const convertSignature = (r, s, recovery) => {
  return new secp256k1.Signature(BigInt(r), BigInt(s), 0);
};

module.exports = convertSignature;
