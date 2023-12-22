import server from "./server";
import { signatureSanitizer } from "./utils/signatureSanitizer";

function Wallet({ signature, setSignature, balance, setBalance, address, setAddress }) {
  async function onChange(evt) {
    const signature = evt.target.value;
    setSignature(signature);
  }

  async function onAddressChange(evt) {
    const address = evt.target.value;
    setAddress(address);
  }

  // only load the balance
  const loadBalance = async () => {

    // Add double quotes around the keys
    const signatureSanitized = signatureSanitizer(signature)

    if (signatureSanitized) {
      const signatureObject = JSON.parse(signatureSanitized);
      const {
        data: { balance },
      } = await server.get(
        `balance/${address}?r=${signatureObject.r}&s=${signatureObject.s}&recovery=${signatureObject.recovery}`
      );
      setBalance(balance);
    } else {
      setBalance(0);
    }
  };

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Address
        <input
          placeholder="Type your address"
          value={address}
          onChange={onAddressChange}
        ></input>
      </label>
      <label>
        Signature
        <input
          placeholder="Type your signature for the address"
          value={signature}
          onChange={onChange}
        ></input>
      </label>

      <div className="balance">Balance: {balance}</div>
      <button
        onClick={() => {
          loadBalance();
        }}
      >
        Load Balance
      </button>
    </div>
  );
}

export default Wallet;
