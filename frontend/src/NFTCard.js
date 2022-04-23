import styled from 'styled-components';

const NFTCard = ({ nft }) => {
  console.log(nft);
  return (
    <Card>
      <Photo style={{ backgroundImage: `url(${nft && nft.image})` }}/>
      <div style={{ margin: 5 }}>
        <CollectionText>{nft && nft.symbol}</CollectionText>
        <Name>{nft && nft.name}</Name>
        <Name style={{ float: 'right' }}>{`x${nft && nft.copies}`}</Name>
      </div>
    </Card>
  );
};

const Card = styled.div`
  width: 200px;
  height: 250px;
  margin: auto;
  border-radius: 10px;
  padding: 0px;
  box-shadow:  8px 8px 16px #d9d9d9,
             -8px -8px 16px #ffffff;
  cursor: pointer;
`;

const Photo = styled.div`
  display: block;
  width: 200px;
  height: 200px;
  background-position: center center;
  background-size: cover;
  border-radius: 10px;
  margin: auto;
`;

const CollectionText = styled.div`
  font-size: 12px;
  color: gray;
`;

const Name = styled.div`
  font-size: 12px;
  font-weight: bold;
  display: inline;
`;

export default NFTCard;