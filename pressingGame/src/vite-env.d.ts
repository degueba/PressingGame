/// <reference types="vite/client" />

import { ethers } from "ethers";

interface ImportMetaEnv {
  VITE_CONTRACT_ADDRESS: string;
}

declare global {
  interface Window {
    ethereum: ExternalProvider | JsonRpcFetchFunc;
    signer: ethers.providers.JsonRpcSigner;
    Provider: ethers.providers.Web3Provider;
    Contract: {
      pressingGame: ethers.Contract;
    };
  }
}
