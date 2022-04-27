/// <reference types="vite/client" />

declare global {
  interface Window {
    ethereum?: any;
    signer?: any;
    Provider?: any;
    Contract?: any;
  }
}
