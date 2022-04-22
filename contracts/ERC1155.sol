// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract ERC1155 {
  /* Mapping from TokenId to account balances */
  mapping(uint256 => mapping(address => uint256)) internal balances;

  /* Mapping from owner to operator approvals */
  mapping(address => mapping(address => bool)) private operatorApprovals;

  event TransferSingle(address indexed _operator, address indexed _from, address indexed _to, uint256 _tokenId, uint256 _amount);
  event TransferBatch(address indexed _operator, address indexed _from, address indexed _to, uint256[] _tokenId, uint256[] _amount);
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

  function _transfer(address _from, address _to, uint256 _tokenId, uint256 _amount) private {
    /* an account can have more than one copy of a token */
    uint256 fromBalance = balances[_tokenId][_from];
    require(fromBalance >= _amount, 'insufficient balance');
    balances[_tokenId][_from] -= _amount;
    balances[_tokenId][_to] += _amount;
  }
  
  function safeTransferFrom(address _from, address _to, uint256 _tokenId, uint256 _amount) 
    public virtual isOwnerOrOperator(_from) receiverIsNotNull(_to) {
    _transfer(_from, _to, _tokenId, _amount);
    emit TransferSingle(msg.sender, _from, _to, _tokenId, _amount);
    require(_checkOnERC1155Received(), 'Receiver is not implemented');
  }

  function safeBatchTransferFrom(address _from, address _to, uint256[] memory _tokenIds, uint256[] memory _amounts) 
    public isOwnerOrOperator(_from) receiverIsNotNull(_to) {
    require(_tokenIds.length == _amounts.length, 'token ids and amount mismatch');
    for (uint256 i = 0; i < _tokenIds.length; i++ ){
      _transfer(_from, _to, _tokenIds[i], _amounts[i]);
    }
    emit TransferBatch(msg.sender, _from, _to, _tokenIds, _amounts);
    require(_checkOnBatchERC1155Received(), 'Receiver is not implemented');
  }

  function _checkOnERC1155Received() internal pure returns(bool) {
    /* oversimplified function */
    return true;
  }

  function _checkOnBatchERC1155Received() internal pure returns(bool) {
    /* oversimplified function */
    return true;
  }

  modifier isOwnerOrOperator(address _from) {
    require(_from == msg.sender || isApprovedForAll(_from, msg.sender), 'msg.sender is not the owner or an operator');
    _;
  }

  modifier receiverIsNotNull(address _to) {
    require(_to != address(0), 'to address is 0');
    _;
  }

  
  // function supportsInterface()
}