const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const recoverWalletAddress =require("./utils/recoverAddress");
const getWalletAddress =require("./utils/getWalletAddress");
const convertSignature =require("./utils/convertSignature");
const verifySignature =require("./utils/verifySignature");

app.use(cors());
app.use(express.json());

const balances = {
  "0x4733a0f04f314a1aab50d0754e29ecc3d1690223": 100,
  "0x7ad1bdc849895bd9f5af138b7a0201f879175193": 50,
  "0x1eec3d8d8b93c3655cebca24d9c5df18861f95bd": 75,
};

app.get("/balance/:address", (req, res) => {
  const { r, s, recovery } = req.query;
  const { address: providedAddress } = req.params;
  
  if (!r || !s) {
    res.status(400).send({ message: "Missing parameters" });
  }
  // get the address from the signature
  const signature = convertSignature(r, s, recovery)
  const publicKey = recoverWalletAddress(signature)
  const address = getWalletAddress(publicKey);
  console.log("🚀  roberto --  ~ file: index.js:23 ~ app.get ~ providedAddress:", providedAddress)
  console.log("🚀  roberto --  ~ file: index.js:34 ~ app.get ~ address:", address)
  console.log("🚀  roberto --  ~ file: index.js:35 ~ app.get ~ address !== providedAddress:", address !== providedAddress)
  const isValid = verifySignature(signature, publicKey);
  if (!isValid || address !== providedAddress) {
    return res.status(200).send({ message: "Invalid signature", balance: 0 });
  }

  const balance = balances[address] || 0;

  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature } = req.body;
  console.log("🚀  roberto --  ~ file: index.js:46 ~ app.post ~ signature:", signature)
  const { r, s, recovery } = signature;
  console.log("🚀  roberto --  ~ file: index.js:47 ~ app.post ~ recovery:", recovery)
  console.log("🚀  roberto --  ~ file: index.js:47 ~ app.post ~ s:", s)
  console.log("🚀  roberto --  ~ file: index.js:47 ~ app.post ~ r:", r)
  console.log("🚀  roberto --  ~ file: index.js:51 ~ app.post ~ !r || !s || !recovery:", !r || !s || !recovery)
  if (!r || !s) {
    return res.status(400).send({ message: "Missing parameters" });
  }
  console.log("🚀  roberto --  ~ file: index.js:47 ~ app.post ~ recipient:", recipient)
  console.log("🚀  roberto --  ~ file: index.js:47 ~ app.post ~ signature:", signature)

  const recoveredSig = convertSignature(r, s, recovery)
  const publicKey = recoverWalletAddress(recoveredSig)
  const address = getWalletAddress(publicKey);
  console.log("🚀  roberto --  ~ file: index.js:34 ~ app.get ~ address:", address)
  console.log("🚀  roberto --  ~ file: index.js:64 ~ app.post ~ sender:", sender)
  const isValid = verifySignature(recoveredSig, publicKey);
  console.log("🚀  roberto --  ~ file: index.js:62 ~ app.post ~ isValid:", isValid)
  console.log("🚀  roberto --  ~ file: index.js:64 ~ app.post ~ address !== sender:", address !== sender)
  if (!isValid || address !== sender) {
    return res.status(200).send({ message: "Invalid signature", balance: 0 });
  }

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
