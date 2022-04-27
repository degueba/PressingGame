// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Lib} from "./libraries/Lib.sol";
import {SafeMath} from "./utils/SafeMath.sol";

contract PressingGame {

    using SafeMath for uint256;

    Lib.GameInfo private gameInfo;

    /**
        @notice Events of the system
     */
    event PressButton(address indexed from, uint256 amount, uint256 blockNumber);
    event Withdraw(address indexed winner, uint256 amount);

    /**
        @notice Function to do the deposit
     */
    function pressButton() external payable {
        uint256 gameBlock = gameInfo.blockNumber + 2;

        if (gameBlock < block.number) {
            bool success = withdraw();
            require(success, "Payment problem");
        }

        gameInfo.amount = gameInfo.amount.add(msg.value);
        gameInfo.blockNumber = block.number;

        emit PressButton(msg.sender, gameInfo.amount, gameInfo.blockNumber);
    }

    /**
        @notice Function to winner do the withdraw
     */
    function withdraw() internal returns (bool success) {

        require(gameInfo.amount > 0, "No amount to withdraw");

        (success, ) = payable(msg.sender).call{value: gameInfo.amount}("");

        require(success, "Payment problem");

        emit Withdraw(msg.sender, gameInfo.amount);
    }

    /**
        @notice Checking if the msg.sender is a winner inside our system
     */
    function checkWinner() public view returns (bool checks) {
        if (winners[msg.sender].amount > 0) {
            checks = true;
        } else {
            checks = false;
        }
    }
}
