import { Transaction, Transition, WalletAdapterNetwork } from "@demox-labs/aleo-wallet-adapter-base";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export const MintPublic = () => {
  const { requestTransaction, publicKey } = useWallet();
  const [receiverAddress, setReceiverAddress] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [feeAmount, setFeeAmount] = useState<number>(0);


  const handleMintPublic = async () => {
    const mint_public_transition = new Transition(
      "token_37162313.aleo",
      "mint_public",
      [receiverAddress, amount.toString() + "u64"]
    );

    const mint_public_tx = new Transaction(
      publicKey!,
      WalletAdapterNetwork.Testnet,
      [mint_public_transition],
      feeAmount, // set your desired fee
      false
    );

    console.log("mint_public_tx:", mint_public_tx);

    if (requestTransaction) {
      try {
        const res = await requestTransaction(mint_public_tx);
        setReceiverAddress("");
        setAmount(0);
        console.log("Transaction submitted:", res);
        // You might want to display a success toast message or take some action here
      } catch (error) {
        console.error("Error submitting transaction:", error);
        // You might want to display an error toast message or take some action here
      }
    }
  };

  return (
    <div>
      <h3>Mint_Public</h3>
      <div className="fst-italic">Mint a public token</div>
      <Form.Group>
        <Form.Label>Receiver Address:</Form.Label>
        <Form.Control
          type="text"
          placeholder="aleo public key"
          onChange={(e) => setReceiverAddress(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Token Amount:</Form.Label>
        <Form.Control
          type="number"
          placeholder="number"
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Fee Amount:</Form.Label>
        <Form.Control
          type="number"
          placeholder="number"
          onChange={(e) => setFeeAmount(Number(e.target.value))}
        />
      </Form.Group>
      <Button onClick={handleMintPublic}>✨ Mint *Public* Token</Button>
    </div>
  );
};