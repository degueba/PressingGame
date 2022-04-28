import { ethers } from "ethers";
import pressingGameFacet from "../abis/PressingGame.json";

export const startConnection = async (): Promise<void> => {
  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  let ethereum = window.ethereum;
  var provider = new ethers.providers.Web3Provider(ethereum, "any");

  // MetaMask requires requesting permission to connect users accounts
  await provider.send("eth_requestAccounts", []);

  // The MetaMask plugin also allows signing transactions to
  // send ether and pay to change state within the blockchain.
  // For this, you need the account signer...
  const signer: ethers.providers.JsonRpcSigner = provider.getSigner();
  loadContract(provider, signer);
};

export const loadContract = async (
  provider: ethers.providers.Web3Provider,
  signer: ethers.providers.JsonRpcSigner
): Promise<void> => {
  const envs: ImportMetaEnv = import.meta.env;
  const { VITE_CONTRACT_ADDRESS } = envs;

  if (!VITE_CONTRACT_ADDRESS) {
    return console.error("Error loading contract.");
  }

  const pressingGame = new ethers.Contract(
    VITE_CONTRACT_ADDRESS,
    pressingGameFacet,
    signer
  );

  window.Provider = provider;
  window.signer = signer;
  window.Contract = {
    pressingGame,
  };
};
