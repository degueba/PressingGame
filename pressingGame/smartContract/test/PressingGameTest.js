const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

describe("itemMarketPlaceTest", async function () {
  let pressingGameContract;
  let account;

  before(async function () {
    account = await ethers.getSigners();

    const PressingGame = await ethers.getContractFactory("PressingGame");

    pressingGame = await PressingGame.deploy();

    await pressingGame.deployed();

    pressingGameContract = pressingGame.address;

    console.log("PressingGame deployed to:", pressingGameContract);
  });

  // it("Testing basic function call", async () => {
  //   await pressingGameContract.checkWinner();
  // });

  // it("check if one user is the winner", async () => {
  //   const notWinner = account[0];

  //   const checkingWinner = await pressingGameContract
  //     .connect(notWinner)
  //     .checkWinner();

  //   assert.equal(checkingWinner, false);
  // });

  // it("user try to withdraw", async () => {
  //   const userAddress = account[0];

  //   const userOldBalance = await ethers.provider.getBalance(
  //     userAddress.address
  //   );

  //   await pressingGameContract.connect(userAddress).withdraw();

  //   const userNewBalance = await ethers.provider.getBalance(
  //     userAddress.address
  //   );

  //   assert.equal(userOldBalance, userNewBalance);
  // });

  it("basic game", async () => {
    // Write a contract in Solidity that is similar to The Button on reddit(r / thebutton),
    //   where participants pay a fixed amount of ether to call press_button, and
    //   then if 3 blocks pass without someone calling press_button, whoever
    //   pressed the button last can call claim_treasure and get the other
    // participants’ deposits

    const firstAddress = account[0];
    const secondAddress = account[1];
    const thirdAddress = account[2];
    const fourthAddress = account[3];

    const amount = ethers.utils.parseEther("0.001");

    const firstOldBalance = await ethers.provider.getBalance(
      firstAddress.address
    );
    const secondOldBalance = await ethers.provider.getBalance(
      secondAddress.address
    );
    const thirdOldBalance = await ethers.provider.getBalance(
      thirdAddress.address
    );
    const fourthOldBalance = await ethers.provider.getBalance(
      fourthAddress.address
    );
    await pressingGameContract
      .connect(firstAddress)
      .deposit({ from: firstAddress.address, value: amount });

    // mining 1 block
    await ethers.provider.send("evm_mine");

    await pressingGameContract
      .connect(secondAddress)
      .deposit({ from: secondAddress.address, value: amount });

    // mining 2 blocks
    await ethers.provider.send("evm_mine");
    await ethers.provider.send("evm_mine");

    await pressingGameContract
      .connect(thirdAddress)
      .deposit({ from: thirdAddress.address, value: amount });
    // mining 3 blocks
    await ethers.provider.send("evm_mine");
    await ethers.provider.send("evm_mine");
    await ethers.provider.send("evm_mine");

    await pressingGameContract
      .connect(fourthAddress)
      .deposit({ from: fourthAddress.address, value: amount });

    assert.equal(parseInt(authorBurn), 90);
  });
});
