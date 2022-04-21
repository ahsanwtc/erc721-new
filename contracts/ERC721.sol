// SPDX-License-Identifier: MIT
pragma solidity 0.8.2;

contract ERC721 {
  mapping(address => uint256) internal balances;
  mapping(uint256 => address) internal owners;
  mapping(address => mapping(address => bool)) private operatorApprovals;
  mapping(uint256 => address) private tokenApprovals;

  event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
  event Approval(address indexed _owner, address indexed _approved, uint256 _tokenId);
  event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);

  /* Returns the number of NFTs assigned to an owner */
  function balanceOf(address _owner) public view returns(uint256) {
    require(_owner != address(0), 'address is 0');
    return balances[_owner];
  }

  /* Returns the address of the owner of the NFT */
  function ownerOf(uint256 _tokenId) public view isTokenValid(_tokenId) returns(address) {
    return owners[_tokenId];
  }

  /* Enables of disables an operator to manage all of the msg.sender's assets */
  function setApprovalForAll(address _operator, bool _approved) public {
    require(_operator != address(0), 'operator address is 0');
    operatorApprovals[msg.sender][_operator] = _approved;
    emit ApprovalForAll(msg.sender, _operator, _approved);
  }

  /* Checks if an address is an operator for another address */
  function isApprovedForAll(address _owner, address _operator) public view returns(bool) {
    require(_owner != address(0), 'owner address is 0');
    require(_operator != address(0), 'operator address is 0');
    return operatorApprovals[_owner][_operator];
  }

  /* Updates an approved address for a NFT */
  function approve(address _to, uint256 _tokenId) public {
    address owner = ownerOf(_tokenId);
    require(owner == msg.sender || isApprovedForAll(owner, msg.sender), 'msg.sender is ont the owner or an approved operator');
    tokenApprovals[_tokenId] = _to;
    emit Approval(owner, _to, _tokenId);
  }

  /* Gets the approved address for an NFT */
  function getApproved(uint256 _tokenId) public view isTokenValid(_tokenId) returns(address) {
    return tokenApprovals[_tokenId];
  }

  /* Transfers ownership of an NFT */
  function transferFrom(address _from, address _to, uint256 _tokenId) public isTokenValid(_tokenId) {
    address owner = ownerOf(_tokenId);
    require(
      owner == msg.sender || getApproved(_tokenId) == msg.sender || isApprovedForAll(owner, msg.sender),
      'msg.sender is not the owner or approved for transfer'
    );
    require(owner == _from, 'from address is not the owner');
    require(_to != address(0), 'to address is 0');

    /* remove all the previous approvals of the NFT because new owner hasn't approved any */
    approve(address(0), _tokenId);

    balances[_from] -= 1;
    balances[_to] += 1;
    owners[_tokenId] = _to;

    emit Transfer(_from, _to, _tokenId);
  }

  /* Standard transferFrom */
  /* Checks if onERC721Received is implemented WHEN transfering to smart contracts */
  function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes memory _data) public {
    transferFrom(_from, _to, _tokenId);
    require(_checkOnERC721Received(), 'Receiver not implemented');
  }

  function safeTransferFrom(address _from, address _to, uint256 _tokenId) public {
    safeTransferFrom(_from, _to, _tokenId, "");
  }

  /* oversimplified */
  function _checkOnERC721Received() private pure returns(bool) {
    return true;
  }

   /* EIP165: Query if a contract implements another interface */
  function supportsInterface(bytes4 _interfaceId) public pure virtual returns(bool) {
    return _interfaceId == 0x80ac58cd;
  }

  modifier isTokenValid(uint256 _tokenId) {
    require(owners[_tokenId] != address(0), 'token does not exists');
    _;
  }
}