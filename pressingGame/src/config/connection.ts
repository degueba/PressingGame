import { ethers } from "ethers";
// import pressingGameFacet from "../abis/PressingGame.json";

export const startConnection = async () => {
  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  // MetaMask requires requesting permission to connect users accounts
  await provider.send("eth_requestAccounts", []);

  // The MetaMask plugin also allows signing transactions to
  // send ether and pay to change state within the blockchain.
  // For this, you need the account signer...
  const signer = provider.getSigner();
  //loadContract(provider, signer);
};

export const loadContract = async (provider: any, signer: any) => {
  const PRESSING_GAME_ADDRESS = "";

  if (!PRESSING_GAME_ADDRESS) {
    return console.error("Error loading contract.");
  }

  let Contract: any = {};
  Contract.pressingGame = new ethers.Contract(
    PRESSING_GAME_ADDRESS,
    //pressingGameFacet,
    signer
  );

  window.Provider = provider;
  window.Contract = Contract;
};
