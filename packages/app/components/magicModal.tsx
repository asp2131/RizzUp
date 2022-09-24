// @ts-nocheck

import { useState } from "react";
import { Magic } from "magic-sdk";
import { Hoverable } from 'react-native-web-hooks';
import Web3 from "web3";
import { Text, TouchableOpacity, View, StyleSheet, Pressable, Dimensions } from 'react-native';
import {magic} from "../../../apps/next/lib/magic"

const web3 = new Web3(magic.rpcProvider);

export default function App({login, account, setAccount}) {
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
    await magic.connect.disconnect().catch((e) => {
      console.log(e);
    });
    setAccount(null);
  };

  return (
    <div className="app">
      {!account && (
        <></>
      )}

      {account && (
        <>
          <button onClick={showWallet} className="button-row">
            Show Wallet
          </button>
          <button onClick={sendTransaction} className="button-row">
            Send Transaction
          </button>
          <button onClick={signMessage} className="button-row">
            Sign Message
          </button>
          <button onClick={disconnect} className="button-row">
            Disconnect
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
