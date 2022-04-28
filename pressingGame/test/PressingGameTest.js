const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

describe("PressingGameTest", async function () {
  let pressingGameContract;
  let account;

  before(async () => {
    account = await ethers.getSigners();

    const PressingGame = await ethers.getContractFactory("PressingGame");

    pressingGame = await PressingGame.deploy();

    await pressingGame.deployed();

    pressingGameContract = pressingGame;

    console.log("PressingGame deployed to:", pressingGameContract.address);
  });

  it("Testing basic function call", async () => {
    const notWinner = account[0];

    await pressingGameContract.connect(notWinner).checkWinner();
  });

  it("check if one user is the winner", async () => {
    const notWinner = account[0];

    const checkingWinner = await pressingGameContract
      .connect(notWinner)
      .checkWinner();

    assert.equal(checkingWinner, false);
  });

  it("user try to withdraw without money", async () => {
    try {
      const userAddress = account[0];
      await pressingGameContract.connect(userAddress).withdraw();

      assert.fail(
        "The transaction should have thrown an error -> No amount to withdraw"
      );
    } catch (e) {
      assert.include(e.message, "revert", "No amount to withdraw");
    }
  });

  it("basic game", async () => {
    // Write a contract in Solidity that is similar to The Button on reddit(r / thebutton),
    //   where participants pay a fixed amount of ether to call press_button, and
    //   then if 3 blocks pass without someone calling press_button, whoever
    //   pressed the button last can call claim_treasure and get the other
    //   participants’ deposits

    // let asd = await pressingGameContract.matematica();
    // console.log("Asd", asd);
    const firstAddress = account[0];
    const secondAddress = account[1];
    const thirdAddress = account[2];
    const fourthAddress = account[3];

    const amount = ethers.utils.parseEther("0.001");

    let test = await pressingGameContract
      .connect(firstAddress)
      .pressButton({ value: amount });

    console.log("block inside1", test);
    console.log("block 1", await ethers.provider.getBlockNumber());

    // mining 1 block
    await ethers.provider.send("evm_mine");

    console.log("block2", await ethers.provider.getBlockNumber());

    let checking = await pressingGameContract
      .connect(firstAddress)
      .checkWinner();
    assert.equal(checking, false);

    test = await pressingGameContract
      .connect(secondAddress)
      .pressButton({ value: amount });

    console.log("block inside3", test.blockNumber);
    console.log("block3", await ethers.provider.getBlockNumber());

    /* MINING - 2 BLOCKS */
    await ethers.provider.send("evm_mine");
    console.log("block4", await ethers.provider.getBlockNumber());
    await ethers.provider.send("evm_mine");
    console.log("block5", await ethers.provider.getBlockNumber());

    checking = await pressingGameContract.connect(secondAddress).checkWinner();
    assert.equal(checking, false);

    test = await pressingGameContract
      .connect(thirdAddress)
      .pressButton({ value: amount });

    console.log("block inside6", test.blockNumber);
    console.log("block6", await ethers.provider.getBlockNumber());
    /* MINING - 3 BLOCKS */
    await ethers.provider.send("evm_mine");
    console.log("block7", await ethers.provider.getBlockNumber());
    await ethers.provider.send("evm_mine");
    console.log("block8", await ethers.provider.getBlockNumber());
    await ethers.provider.send("evm_mine");
    console.log("block9", await ethers.provider.getBlockNumber());

    checking = await pressingGameContract.connect(thirdAddress).checkWinner();

    assert.equal(checking, true);
  });
});
