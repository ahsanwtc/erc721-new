// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import './ERC1155.sol';

contract SuperMarioWorldERC1155 is ERC1155 {
  string public name;
  string public symbol;
  uint256 public tokenCount;
  mapping(uint256 => string) private tokenURIs;

  constructor(string memory _name, string memory _symbol) {
    name = _name;
    symbol = _symbol;
  }

  function uri(uint256 _tokenId) public view returns(string memory) {
    return tokenURIs[_tokenId];
  }

  function mint(uint256 _amount, string memory _uri) public {
    require(msg.sender != address(0), 'msg.sender is 0 address');
    tokenCount += 1;
    balances[tokenCount][msg.sender] = _amount;
    tokenURIs[tokenCount] = _uri;
    emit TransferSingle(msg.sender, address(0), msg.sender, tokenCount, _amount);
  }
}