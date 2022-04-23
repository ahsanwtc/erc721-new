
import styled from "styled-components";
import NFTCard from "./NFTCard";

function App() {
  let nfts = [
    { name: 'Mario', symbol: 'SPMK', copies: 10, image: 'https://via.placeholder.com/150' },
    { name: 'Luigi', symbol: 'SPMK', copies: 10, image: 'https://via.placeholder.com/150' },
    { name: 'Yoshi', symbol: 'SPMK', copies: 10, image: 'https://via.placeholder.com/150' },
    { name: 'Donkey Kong', symbol: 'SPMK', copies: 10, image: 'https://via.placeholder.com/150' },
    { name: 'Mario', symbol: 'SPMK', copies: 10, image: 'https://via.placeholder.com/150' },
    { name: 'Luigi', symbol: 'SPMK', copies: 10, image: 'https://via.placeholder.com/150' },
    { name: 'Yoshi', symbol: 'SPMK', copies: 10, image: 'https://via.placeholder.com/150' },
    { name: 'Donkey Kong', symbol: 'SPMK', copies: 10, image: 'https://via.placeholder.com/150' }
  ];

  return (
    <div className="App">
      <Container>
        <Title>Super Mario World Collection</Title>
        <Subtitle>The rarest and the best of Super Mario World</Subtitle>
        <Grid>
          {nfts.map((nft, index) => <NFTCard key={index} nft={nft} />)}
        </Grid>
      </Container>
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
