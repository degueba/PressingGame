const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

describe("pressingGameTest", async function () {
  const GAME_AMOUNT_START = ethers.utils.parseEther("0.001");
  let pressingGameContract;
  let account;
  let firstAddress;
  let secondAddress;
  let thirdAddress;

  /* 
    MINING - {n} BLOCKS 
  */
  const createBlock = async (blockNo) => {
    for (i = 0; i < blockNo; i++) {
      await ethers.provider.send("evm_mine");
    }
  };

  before(async () => {
    account = await ethers.getSigners();
    firstAddress = account[0];
    secondAddress = account[1];
    thirdAddress = account[2];

    const PressingGame = await ethers.getContractFactory("PressingGame");
    pressingGame = await PressingGame.deploy();

    await pressingGame.deployed();
    pressingGameContract = pressingGame;

    console.log("PressingGame deployed to:", pressingGameContract.address);
  });

  it("should test a basic function call", async () => {
    const notWinner = account[0];
    await pressingGameContract.connect(notWinner).checkWinner();
  });

  it("should a random user not be the winner", async () => {
    const notWinner = account[0];
    const checkingWinner = await pressingGameContract
      .connect(notWinner)
      .checkWinner();

    assert.equal(checkingWinner, false);
  });

  it("should a user not withdraw without money", async () => {
    try {
      const userAddress = account[0];
      await pressingGameContract.connect(userAddress).withdraw();

      assert.fail(
        "The transaction should have thrown an error -> No amount to withdraw"
      );
    } catch (err) {
      assert.include(err.message, "revert", "Game not finished");
    }
  });

  it("should the first user press the button and not be the winner", async () => {
    await pressingGameContract
      .connect(firstAddress)
      .pressButton({ value: GAME_AMOUNT_START });

    createBlock(1);

    let checking = await pressingGameContract
      .connect(firstAddress)
      .checkWinner();
    assert.equal(checking, false);
  });

  it("should the second user press the button and not be the winner", async () => {
    await pressingGameContract
      .connect(secondAddress)
      .pressButton({ value: GAME_AMOUNT_START });

    createBlock(2);

    checking = await pressingGameContract.connect(secondAddress).checkWinner();
    assert.equal(checking, false);
  });

  it("should the third user press the button and be the winner", async () => {
    await pressingGameContract
      .connect(thirdAddress)
      .pressButton({ value: GAME_AMOUNT_START });

    createBlock(3);

    checking = await pressingGameContract.connect(thirdAddress).checkWinner();

    assert.equal(checking, true);
  });

  it("should a random user not be able to withdraw the participant's deposits", async () => {
    try {
      let oldBalance = await ethers.provider.getBalance(secondAddress.address);

      await pressingGameContract.connect(secondAddress).withdraw();

      let newBalance = await ethers.provider.getBalance(secondAddress.address);
      assert.equal(oldBalance, newBalance);
    } catch (err) {
      assert.include(err.message, "revert", "You're not able to withdraw");
    }
  });

  it("should the winner be able to withdraw the participant's deposits", async () => {
    let oldBalance = await ethers.provider.getBalance(thirdAddress.address);

    await pressingGameContract.connect(thirdAddress).withdraw();

    let newBalance = await ethers.provider.getBalance(thirdAddress.address);

    assert.notEqual(oldBalance, newBalance);
  });
});
