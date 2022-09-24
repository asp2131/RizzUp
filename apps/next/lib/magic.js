import { Magic } from 'magic-sdk';
import { OAuthExtension } from '@magic-ext/oauth';
import { ConnectExtension } from "@magic-ext/connect";

const customNodeOptions = {
  rpcUrl: 'https://mainnet.infura.io/v3/',
  chainId: 1,
}

// Create client-side Magic instance
const createMagic = (key) => {
  return (
    typeof window != 'undefined' &&
    new Magic(key, {
      network: customNodeOptions,
      extensions: [new ConnectExtension()]
    })
  );
};



export const magic = createMagic("pk_live_73AAE8A5F81B1CF3");
