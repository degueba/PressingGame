// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Lib} from "./libraries/Lib.sol";
import {SafeMath} from "./utils/SafeMath.sol";
import {ReentrancyGuard} from "./utils/ReentrancyGuard.sol";

/**
    ReentrancyGuard : A modifier that can prevent reentrancy during certain functions. 
**/ 
contract PressingGame is ReentrancyGuard {
    uint256 private constant GAME_AMOUNT_PARTICIPATION = 1000000000000000;
    using SafeMath for uint256;

    Lib.GameInfo private gameInfo;

    /**
        @notice Events of the system
     */
    event PressButton(address indexed from, uint256 amount, uint256 blockNumber);
    event Withdraw(address indexed winner, uint256 amount);

    /**
        @notice Function with the ability to make a deposit and play the game
     */
    function pressButton() external payable {
        require(msg.value == GAME_AMOUNT_PARTICIPATION, "Wrong amount.");

        if (gameInfo.amount > 0) {
            validateGameFinished();
        }
            
        gameInfo.winner = msg.sender;
        gameInfo.amount = gameInfo.amount.add(msg.value);
        gameInfo.blockNumber = block.number;
        
        emit PressButton(msg.sender, gameInfo.amount, gameInfo.blockNumber);

    }

    /**
        @notice Function for winner to withdraw
        @return success  boolean to the the success
     */
    function withdraw() external nonReentrant returns (bool success) {
        require(checkGameFinished(), "Game not finished");

        uint256 amount = gameInfo.amount;
        address winner = gameInfo.winner;

        require(amount > 0, "No amount to withdraw");
        require(winner == msg.sender, "Your not the winner");

        (success, ) = payable(msg.sender).call{value: amount}("");

        require(success, "Payment problem");

        gameInfo.amount = 0;
        gameInfo.winner = address(0);
        gameInfo.blockNumber = 0;

        emit Withdraw(msg.sender, amount);
        
    }
    
    /**
     @notice Checking if the msg.sender is a winner inside our system
     */
    function checkWinner() public view returns (bool success) {
        if (gameInfo.amount > 0) {
            if (checkGameFinished()) {
                if (gameInfo.winner == msg.sender) {
                    success = true;
                }
            }
        } 
    }

    /**
     @notice Checking whether the game has finished
     */
    function checkFinished() public view returns (bool success) {
        if (gameInfo.amount > 0) {
            if (checkGameFinished()) {
                success = true;
            }
        } 
    }

    /**
     @notice Checking the game blocknumber
     */
    function validateGameFinished() public view {
        uint256 addedBlockNumber = gameInfo.blockNumber.add(3);
        require(addedBlockNumber >= block.number,"Game has finished.");
    }

    /**
     @notice Checking if the msg.sender is a winner inside our system
    */
    function checkGameFinished() public view returns (bool success) {
        uint256 gameBlock = gameInfo.blockNumber.add(3);
        if (gameBlock <= block.number) {
            success = true;
        }
    }
}
