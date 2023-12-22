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
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

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
