const { ethers } = require("hardhat");

async function main() {
  const SuperMarioWorld = await ethers.getContractFactory('SuperMarioWorld');
  const superMarioWorld = await SuperMarioWorld.deploy('SuperMario World', 'SPRM');
  await superMarioWorld.deployed();
  console.log(`SuperMario World deployed at: ${superMarioWorld.address}`);
  await superMarioWorld.mint('ipfs://QmaGdpuSNhU1mb2s6ZLr4TkEnHbHCiaf6rtMt8SoPeeKyt');
  console.log('NFT successfully minted');
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
