import axios from "axios";
import { ethers } from 'ethers';

export const connect = async () => {
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = handleAccountsChanged(accounts);
    return account;
  } catch (error) {
    if (error.code === 4001)  {
      alert('Please connect to Metamask to continue.');
    } else {
      console.log(error);
    }
  }
};

export const handleAccountsChanged = accounts => {
  if (accounts.length === 0) {
    console.log('Please connect to Metamask');
  } else {
    window.ethereum.on("accountsChanged", () => { window.location.reload() });
    return accounts[0];
  }
};

export const getNFTs = async (contractAddress, accountAddress) => {
  const rpc = process.env.REACT_APP_RPC;
  const ehtersProvider = new ethers.providers.JsonRpcProvider(rpc);
  const abi = [
    'function symbol() public view returns(string memory)',
    'function tokenCount() public view returns(uint)',
    'function name() public view returns(string memory)',
    'function uri(uint256 _tokenId) public view returns(string memory)',
    'function balanceOfBatch(address[] memory accounts, uint256[] memory _tokenIds) public view returns(uint256[] memory)'
  ];

  const nftCollection = new ethers.Contract(
    contractAddress,
    abi,
    ehtersProvider
  );

  const numberOfNFTs = (await nftCollection.tokenCount()).toNumber();
  const symbol = await nftCollection.symbol();
  const accounts = Array(numberOfNFTs).fill(accountAddress);
  const tokenIds = Array.from({ length: numberOfNFTs }, (_, i) => i + 1);
  const copies = await nftCollection.balanceOfBatch(accounts, tokenIds);

  const tempArray = [];
  let baseURI = '';

  for (let i = 1; i <= numberOfNFTs; i++) {
    if (i === 1) {
      /* uri: ipfs.com/ipfs/asdasdasdasd/1.json */
      const tokenURI = await nftCollection.uri(i);
      baseURI = tokenURI.replace(/\d+.json/, '');
      let metadata = await getMetadataFromIpfs(tokenURI);
      /* replace the url with pinata url */
      const image = metadata.image.replace(/^https:\/\/ipfs.io/, 'https://gateway.pinata.cloud');
      metadata.symbol = symbol;
      metadata.copies = copies[i - 1];
      metadata.image = image;
      tempArray.push(metadata);
      continue;
    }

    let metadata = await getMetadataFromIpfs(`${baseURI}${i}.json`);
    /* replace the url with pinata url */
    const image = metadata.image.replace(/^https:\/\/ipfs.io/, 'https://gateway.pinata.cloud');
    metadata.symbol = symbol;
    metadata.image = image;
    metadata.copies = copies[i - 1];
    tempArray.push(metadata);

  }
  return tempArray;
};

const getMetadataFromIpfs = async uri => {
  try {
    const { data } = await axios.get(uri);
    return data;
    
  } catch (error) {
    console.log('ipfs error, switching to https');
  }

  try {
    // ipfs://hashcode/1.json
    const link = `https://gateway.pinata.cloud/ipfs/${uri.replace(/^ipfs:\/\//, '')}`;
    const { data } = await axios.get(link);
    return data;
    
  } catch (error) {
    console.log('https error');
  }
};