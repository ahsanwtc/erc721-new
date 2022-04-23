import styled from 'styled-components';

const NFTCard = ({ nft }) => {
  console.log(nft);
  return (
    <Card>
      This is nft card
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

export default NFTCard;