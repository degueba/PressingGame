// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library Lib {
    struct GameInfo {
        address winner;
        uint256 amount;
        uint256 blockNumber;
    }
}
