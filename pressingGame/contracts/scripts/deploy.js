// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.

const hre = require("hardhat");
const chalk = require("chalk");
const figlet = require("figlet");
const inquirer = require("inquirer");
const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  await hre.run("compile");

  const account = await ethers.getSigners();

  // We get the contract to deploy
  const PressingGame = await ethers.getContractFactory("PressingGame");

  pressingGame = await PressingGame.deploy();

  await pressingGame.deployed();

  const contractAddress = pressingGame.address;
  const envPath = path.join(__dirname, "../../.env");
  const envContent = `VITE_CONTRACT_ADDRESS="${contractAddress}"`;

  console.log(`PressingGame deployed to: ${contractAddress}`);
  console.log(`.env is created on ${envPath}`);
  console.log(`File Content: ${envContent}`);

  fs.writeFileSync(envPath, envContent);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

(async () => {
  try {
    console.log(
      chalk.yellow(figlet.textSync("oneOf", { horizontalLayout: "full" }))
    );
    console.log(
      chalk.cyanBright(
        "Welcome to the Pressing game smart contract deployment centre"
      )
    );
    const answer = await inquirer.prompt({
      type: "list",
      name: "confirm",
      message: chalk.blueBright(
        "Are you sure you want to deploy the contract?"
      ),
      choices: ["No", "Yes"],
    });
    if (answer.confirm === "Yes") await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
