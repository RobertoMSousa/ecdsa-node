import { useState } from "react";
import server from "./server";
import { signatureSanitizer } from "./utils/signatureSanitizer";

function Transfer({address, signature, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    const signatureSanitized = signatureSanitizer(signature)
    console.log("🚀  roberto --  ~ file: Transfer.jsx:15 ~ transfer ~ signatureSanitized:", signatureSanitized)
    const signatureObject = JSON.parse(signatureSanitized);
    console.log("🚀  roberto --  ~ file: Transfer.jsx:17 ~ transfer ~ signatureObject:", signatureObject)

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        signature: signatureObject,
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
    } catch (error) {
      console.log("🚀  roberto --  ~ file: Transfer.jsx:30 ~ transfer ~ ex:", error)
      // alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an recipient address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
