// @ts-nocheck

import { useContext } from "react";
import { Magic } from "magic-sdk";
import { UserContext } from "../../../apps/next/lib/UserContext"
import Web3 from "web3";
import { Text, TouchableOpacity, View, StyleSheet, Pressable, Dimensions } from 'react-native';
import {magic} from "../../../apps/next/lib/magic"
import { deleteCookie } from 'cookies-next';
import Router from 'next/router';

const web3 = new Web3(magic.rpcProvider);

export default function App({ account, setAccount}) {
  const [user, setUser] = useContext(UserContext);

  const sendTransaction = async () => {
    const publicAddress = (await web3.eth.getAccounts())[0];
    const txnParams = {
      from: publicAddress,
      to: publicAddress,
      value: web3.utils.toWei("0.01", "ether"),
      gasPrice: web3.utils.toWei("30", "gwei")
    };
    web3.eth
      .sendTransaction(txnParams as any)
      .on("transactionHash", (hash) => {
        console.log("the txn hash that was returned to the sdk:", hash);
      })
      .then((receipt) => {
        console.log("the txn receipt that was returned to the sdk:", receipt);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signMessage = async () => {
    const publicAddress = (await web3.eth.getAccounts())[0];
    const signedMessage = await web3.eth.personal
      .sign("My Message", publicAddress, "")
      .catch((e) => console.log(e));
    console.log(signedMessage);
  };

  const showWallet = () => {
    magic.connect.showWallet().catch((e) => {
      console.log(e);
    });
  };

  const disconnect = async () => {
    console.log("disconnect")
    await magic.connect.disconnect().catch((e) => {
      console.log(e);
    });
    setAccount(null);
    deleteCookie("account")
    Router.reload()
  };

  return (
    <div className="app">
      {!account && (
        <>
        </>
      )}

      {  user?.id  && (
        <>
          {/* <button onClick={showWallet} className="button-row">
            Show Wallet
          </button>
          <button onClick={sendTransaction} className="button-row">
            Send Transaction
          </button>
          <button onClick={signMessage} className="button-row">
            Sign Message
          </button> */}
          <button onClick={disconnect} >
            Logout
          </button>
        </>
      )}
    </div>
  );
}

const styles = StyleSheet.create({
  text: {
      fontWeight: "500",
      fontSize: 18
  },
  buttonContainer: {
      padding: 20
  },
  button: {
      padding: 20,
      backgroundColor: '#583edf',
      justifyContent: 'center',
      borderRadius: 50,
      width: "30%",
      alignItems: "center",
      borderColor: "white",
      borderWidth: 2
  },
})
