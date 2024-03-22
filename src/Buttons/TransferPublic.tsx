import { Transaction, Transition, WalletAdapterNetwork } from "@demox-labs/aleo-wallet-adapter-base";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export const TransferPublic = () => {
  const { requestTransaction, publicKey } = useWallet();
  const [amount, setAmount] = useState<number>(0);
  const [toAddr, setToAddr] = useState<string>("");

  const handleTransfer = async () => {
    
    const transfer_public_transition = new Transition(
      "token_37162313.aleo",
      "transfer_public",
      [
        toAddr, amount.toString() + "u64"
      ]
    ) 

    const transfer_public_tx = new Transaction(
      publicKey!,
      WalletAdapterNetwork.Testnet,
      [transfer_public_transition],
      1000000,
      false,
    )

    console.log("transfer_public_tx:", transfer_public_tx );

    if (requestTransaction) {
       const res = await requestTransaction(transfer_public_tx );
      setAmount(0);
      setToAddr("");

       console.log("check: ", res);
    }
  };

  return (
    <div>
      <h3>Transfer_Public</h3>
      <Form.Group>
        <Form.Label>Receiver Address:</Form.Label>
        <Form.Control
          type="text"
          placeholder="aleo public key"
          onChange={(e) => setToAddr(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Amount:</Form.Label>
        <Form.Control
          type="number"
          placeholder="token amount"
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </Form.Group>
      <Button onClick={handleTransfer}>✨ Transfer Aleo Credits</Button>
    </div>
  );
};