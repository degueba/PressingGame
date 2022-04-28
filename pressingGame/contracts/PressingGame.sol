// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Lib} from "./libraries/Lib.sol";
import {SafeMath} from "./utils/SafeMath.sol";

contract PressingGame {
    uint256 private constant GAME_AMOUNT_PARTICIPATION = 1000000000000000;
    // uint public blockNumber = block.number;

    using SafeMath for uint256;

    Lib.GameInfo private gameInfo;
    // mapping(address => Lib.GameWinner) private gameWinner;

    /**
        @notice Events of the system
     */
    event PressButton(address indexed from, uint256 amount, uint256 blockNumber);
    event Withdraw(address indexed winner, uint256 amount);

    /**
        @notice Function to do the deposit
     */
    function pressButton() external payable returns (uint256 gameBlock){
       //someNumber = gameInfo.blockNumber.add(4);
        // gameBlock = gameInfo.blockNumber;

        require(msg.value == GAME_AMOUNT_PARTICIPATION, "Wrong amount.");
        if (gameInfo.amount > 0) {
            checkGameBlockNumber();
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
    function withdraw() public returns (bool success) {
        // blockNumber = block.number;
        uint256 gameBlock = gameInfo.blockNumber + 2;

        require(gameBlock < block.number, "Game is not finished");

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
        uint256 gameBlock = gameInfo.blockNumber + 2;

        success = false;
        
        if (gameInfo.amount > 0) {
            if (gameBlock < block.number) {
                if (gameInfo.winner == msg.sender) {
                    success = true;
                }
            }
        } 
    }

    /**
     @notice Checking if the msg.sender is a winner inside our system
     */
    function checkFinished() public view returns (bool success) {
        uint256 gameBlock = gameInfo.blockNumber + 2;

        success = false;
        
        if (gameInfo.amount > 0) {
            if (gameBlock < block.number) {
                success = true;
            }
        } 
    }

    function checkGameBlockNumber() public view {
        uint256 addedBlockNumber = gameInfo.blockNumber.add(4);
        require(addedBlockNumber > block.number,"Seila");
    }
}
