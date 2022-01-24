// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenA is ERC20 {
    address public owner;

    event SentToChainB(address sender, uint256 amount);
    event ReceivedFromChainB(address sender, uint256 amount);

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 supply
    ) ERC20(_name, _symbol) {
        _mint(msg.sender, supply);
        owner = msg.sender;
    }

    modifier Owner() {
        require(msg.sender == owner, "only owner can call");
        _;
    }

    function changeOwner(address newOwner) public Owner {
        owner = newOwner;
    }

    function receiveFromChainB(uint256 mintableTokens, address receiver)
        public
        Owner
    {
        _mint(receiver, mintableTokens);
        emit ReceivedFromChainB(msg.sender, mintableTokens);
    }

    function sendToChainB(uint256 burnableTokens) public {
        _burn(msg.sender, burnableTokens);
        emit SentToChainB(msg.sender, burnableTokens);
    }

    //multiply with a factor of 10**18 to the token amount externally
}
