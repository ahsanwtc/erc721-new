import { useState, useEffect } from 'react';
import styled from "styled-components";
import NFTCard from "./NFTCard";
import Modal from "./Modal";
import { connect, getNFTs } from './helpers';


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

  @media(max-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media(max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  @media(max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export default App;
