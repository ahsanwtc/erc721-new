// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract ERC1155 {
  /* Mapping from TokenId to account balances */
  mapping(uint256 => mapping(address => uint256)) internal balances;

  /* Mapping from owner to operator approvals */
  mapping(address => mapping(address => bool)) private operatorApprovals;

  // event TransferSingle()
  // event TransferBatch()
  event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
  // event URI()

  /* Gets the balance of an address's tokens */
  function balanceOf(address _owner, uint256 _tokenId) public view returns(uint256) {
    require(_owner != address(0), 'owner address is 0');
    return balances[_tokenId][_owner];
  }
  
  /* Gets the balance of multiple addresses tokens */
  function balanceOfBatch(address[] memory _owners, uint256[] memory _tokenIds) public view returns(uint256[] memory) {
    require(_owners.length == _tokenIds.length, 'owners and ids length mismatch');
    uint256[] memory batchBalances = new uint256[](_owners.length);    
    for (uint256 i = 0; i < _owners.length; i++) {
      batchBalances[i] = balanceOf(_owners[i], _tokenIds[i]);
    }
    return batchBalances;
  }
  
  /* Checks if an address is an operator of another address */
  function isApprovedForAll(address _owner, address _operator) public view returns(bool) {
    return operatorApprovals[_owner][_operator];
  }

  /* It enables or disables an operator to manage all of msg.sender's assests */
  function setApprovalForAll(address _operator, bool _approved) public {
    operatorApprovals[msg.sender][_operator] = _approved;
    emit ApprovalForAll(msg.sender, _operator, _approved);
  }
  
  // function safeTransferFrom()
  // function safeBatchTransferFrom()
  // function supportsInterface()
}