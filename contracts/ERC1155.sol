// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract ERC1155 {
  /* Mapping from TokenId to account balances */
  mapping(uint256 => mapping(address => uint256)) internal balances;

  // event TransferSingle()
  // event TransferBatch()
  // event ApprovalForAll()
  // event URI()

  /* Gets the balance of an address's tokens */
  function balanceOf(address _owner, uint256 _tokenId) public view returns(uint256) {
    require(_owner != address(0), 'owner address is 0');
    return balances[_tokenId][_owner];
  }
  // function balanceOfBatch()
  // function setApprovalForAll()
  // function safeTransferFrom()
  // function safeBatchTransferFrom()
  // function isApprovedForAll()
  // function supportsInterface()
}