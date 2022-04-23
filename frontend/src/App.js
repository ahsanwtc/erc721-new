
import NFTCard from "./NFTCard";

function App() {
  let nft = { name: 'Mario', symbol: 'SPMK', copies: 10, image: 'https://via.placeholder.com/150' };

  return (
    <div className="App">
      <NFTCard nft={nft} />
    </div>
  );
}

export default App;
