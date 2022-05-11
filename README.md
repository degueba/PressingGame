# Pressing Game | OneOf

The Pressing game is a decentralized application in which users compete against one another by pressing buttons that trigger powerful smart contracts. To participate, you will have to put down a small deposit that will be collected to pay the final winner, and each participant will get the chance to press the undisputable "PRESS BUTTON". If you're lucky, there will be no other users pressing the button after you, and you will start counting! If 3 blocks have passed and you are still the last person, that means you have won. You will now see a green button "Claim your treasure" that allows you to claim your prize.

#### _How to Start_

1 step - `yarn` or `yarn build` | **Install dependencies**
----
2 step - `yarn deploy:contract` | **Deploy Contracts and Export Contract Address (_VITE_CONTRACT_ADDRESS_) to _env.file_**
----
3 step - `yarn test` | **Test the smart contracts**
----
4 step - `yarn start` | **Start the dev environment with Vite and ReactTS**
----
5 step - `yarn block` | **Generate a new block in Ganache**

### _Simple Fluxogram_

[<img src="https://ibb.co/ygzwPck">]
https://whimsical.com/pressinggame-oneof-DpCdaauWo78XtRceBuYS8w

### File Structure

- **oneof\\pressingGame**
  - **contracts**
    - [PressingGame.sol](contracts/PressingGame.sol)
    - **libraries**
      - [Lib.sol](contracts/libraries/Lib.sol)
    - **scripts**
      - [block.js](contracts/scripts/block.js)
      - [deploy.js](contracts/scripts/deploy.js)
    - **utils**
      - [SafeMath.sol](contracts/utils/SafeMath.sol)
  - [hardhat.config.js](hardhat.config.js)
  - [index.html](index.html)
  - [package.json](package.json)
  - **src**
    - [App.scss](src/App.scss)
    - [App.tsx](src/App.tsx)
    - **abis**
      - [PressingGame.json](src/abis/PressingGame.json)
    - **config**
      - [connection.ts](src/config/connection.ts)
    - [favicon.svg](src/favicon.svg)
    - **fonts**
      - [Apex\-Mk3\-Bold.ttf](src/fonts/Apex-Mk3-Bold.ttf)
      - [fonts.scss](src/fonts/fonts.scss)
    - [index.css](src/index.css)
    - [logo.svg](src/logo.svg)
    - [main.tsx](src/main.tsx)
    - **styles**
      - [colors.scss](src/styles/colors.scss)
      - [index.scss](src/styles/index.scss)
    - [vite\-env.d.ts](src/vite-env.d.ts)
  - **test**
    - [PressingGameTest.js](test/PressingGameTest.js)
  - [.env](.env)
  - [tsconfig.json](tsconfig.json)
  - [tsconfig.node.json](tsconfig.node.json)
  - [vite.config.ts](vite.config.ts)
  - [yarn.lock](yarn.lock)
