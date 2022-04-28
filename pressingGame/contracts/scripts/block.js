const { ethers } = require("hardhat");
const chalk = require("chalk");
const figlet = require("figlet");
const inquirer = require("inquirer");

const createBlock = async (blockNo) => {
  for (i = 1; i <= blockNo; i++) {
    await ethers.provider.send("evm_mine");
    console.log(`${i} Block mined`);
  }
  process.exit(0);
};

(async () => {
  try {
    console.log(
      chalk.yellow(figlet.textSync("oneOf", { horizontalLayout: "full" }))
    );
    const answer = await inquirer.prompt({
      type: "number",
      name: "blockNo",
      message: chalk.blueBright("How many Blocks to mine?"),
      default: 1,
    });
    await createBlock(answer.blockNo);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
