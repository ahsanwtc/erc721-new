import { useState, useEffect } from 'react';
import styled from "styled-components";
import NFTCard from "./NFTCard";
import Modal from "./Modal";
import { ethers } from 'ethers';
import { connect, getNFTs } from './helpers';

const axios = require('axios');


const initalNFTs = [
  { name: 'Mario', symbol: 'SPMK', copies: 10, image: 'https://via.placeholder.com/150' },
  { name: 'Luigi', symbol: 'SPMK', copies: 10, image: 'https://via.placeholder.com/150' },
  { name: 'Yoshi', symbol: 'SPMK', copies: 10, image: 'https://via.placeholder.com/150' },
  { name: 'Donkey Kong', symbol: 'SPMK', copies: 10, image: 'https://via.placeholder.com/150' },
  { name: 'Mario', symbol: 'SPMK', copies: 10, image: 'https://via.placeholder.com/150' },
  { name: 'Luigi', symbol: 'SPMK', copies: 10, image: 'https://via.placeholder.com/150' },
  { name: 'Yoshi', symbol: 'SPMK', copies: 10, image: 'https://via.placeholder.com/150' },
  { name: 'Donkey Kong', symbol: 'SPMK', copies: 10, image: 'https://via.placeholder.com/150' }
];

const SuperMarioWorldCollectionContractAddress = '0xef91658689bFb87690CAA4d3Cf9308fbdcd806Cc';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState(undefined);
  const [nfts, setNFTs] = useState(initalNFTs);

  useEffect(() => {
    const init = async () => {
      const address = await connect();
      if (address) {
        const nfts = await getNFTs(SuperMarioWorldCollectionContractAddress, address);
        setNFTs(nfts);
      }
    };

    init();
  }, []);

  // const getNFTs = async address => {
  //   const rpc = process.env.REACT_APP_RPC;
  //   const ehtersProvider = ethers.providers.JsonRpcProvider(rpc);
  //   const abi = [
  //     'function symbol() public view returns(string memory)',
  //     'function tokenCount() public view returns(uint)',
  //     'function name() public view returns(string memory)',
  //     'function uri(uint256 _tokenId) public view returns(string memory)',
  //     'function balanceOfBatch(address[] memory accounts, uint256[] memory _tokenIds) public view returns(uint256[] memory)'
  //   ];

  //   const nftCollection = new ethers.Contract(
  //     SuperMarioWorldCollectionContractAddress,
  //     abi,
  //     ehtersProvider
  //   );

  //   const numberOfNFTs = (await nftCollection.tokenCount()).toNumber();
  //   const symbol = await nftCollection.symbol();
  //   const accounts = Array(numberOfNFTs).fill(address);
  //   const tokenIds = Array.from({ length: numberOfNFTs }, (_, i) => i + 1);
  //   const copies = await nftCollection.balanceOfBatch(accounts, tokenIds);

  //   const tempArray = [];
  //   let baseURI = '';

  //   for (let i = 1; i <= numberOfNFTs; i++) {
  //     if (i === 1) {
  //       /* uri: ipfs.com/ipfs/asdasdasdasd/1.json */
  //       const tokenURI = await nftCollection.uri(i);
  //       baseURI = tokenURI.replace(/\d+.json/, '');
  //       let metadata = await getMetadataFromIpfs(tokenURI);
  //       metadata.symbol = symbol;
  //       metadata.copies = copies[i - 1];
  //       tempArray.push(metadata);
  //       continue;
  //     }

  //     let metadata = await getMetadataFromIpfs(`${baseURI}${i}.json`);
  //     metadata.symbol = symbol;
  //     metadata.copies = copies[i - 1];
  //     tempArray.push(metadata);

  //   }

  //   setNFTs(tempArray);
  // };

  // const getMetadataFromIpfs = async uri => {
  //   const { data } = await axios.get(uri);
  //   return data;
  // };

  const toggleModal = index => {
    if (index >= 0) {
      setSelectedNFT(nfts[index]);
    }
    setShowModal(!showModal);
  };

  return (
    <div className="App">
      <Container>
        <Title>Super Mario World Collection</Title>
        <Subtitle>The rarest and the best of Super Mario World</Subtitle>
        <Grid>
          {nfts.map((nft, index) => <NFTCard key={index} nft={nft} toggleModal={() => toggleModal(index)} />)}
        </Grid>
      </Container>
      {showModal && <Modal nft={selectedNFT} toggleModal={toggleModal} />}      
    </div>
  );
};

const Title = styled.h1`
  margin: 0;
  text-align: center;
`;

const Subtitle = styled.h4`
  margin-top: 0;
  text-align: center;
  color: gray;
`;

const Container = styled.div`
  width: 70%;
  max-width: 1200px;
  margin: auto;
  margin-top: 100px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 40px;
`;

export default App;
