import styled from "styled-components";
import { Photo } from "./NFTCard";
import ProgressBar from "./ProgressBar";

const Modal = ({ nft, toggleModal }) => {
  return (
    <Container>
      <Content>
        <Grid>
          <Photo style={{ backgroundImage: `url(${nft && nft.image})`, height: 400, width: 400 }}/>
          <div>
            <Title>{nft && nft.name}</Title>
            <Paragraph>{`You own ${nft ? nft.copies : 0} copies`}</Paragraph>
            <SectionText>Description</SectionText>
            <Paragraph style={{ width: 400 }}>{nft && nft.description}</Paragraph>
            <SectionText>Attributes</SectionText>
            {nft && nft.attributes && nft.attributes.map((attribute, i) => 
              <div key={i}>
                <div style={{ margin: '10px 0px 5px 0px'}}>
                  <AttributeText>{attribute.trait_type}</AttributeText>
                  <AttributeText style={{ float: 'right' }}>{attribute.value}</AttributeText>
                </div>
                <ProgressBar percent={attribute.value * 10}/>
              </div>
            )}
          </div>
        </Grid>
        <Button onClick={toggleModal}>&times;</Button>
      </Content>
    </Container>
  );
};


const Container = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  z-index: 100; /* stay at the top of everything */
  left: 0;  /* start at top left */
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto; /* enable scroll if needed */
  background-color: rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
  position: relative;
  width: 900px;
  margin: auto;
  background-color: white;
  border-radius: 20px;
  padding: 20px;

  @media(max-width: 900px) {
    width: 400px;
  }
`;

const Title = styled.h1`
  margin: 0;

`;

const Paragraph = styled.p`
  margin: 0 0 15px 0;
`;

const SectionText = styled.h3`
  margin: 5px 0 5px 0;
`;

const Grid = styled.div`
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 40px;

  @media(max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Button = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  padding: 20px 25px 0 0;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

const AttributeText = styled.h4`
  color: gray;
  margin: 0;
  display: inline;
`;

export default Modal;