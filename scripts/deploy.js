const { ethers } = require("hardhat");

async function main() {
  const SuperMarioWorld = await ethers.getContractFactory('SuperMarioWorld');
  const superMarioWorld = await SuperMarioWorld.deploy('SuperMario World', 'SPRM');
  await superMarioWorld.deployed();
  console.log(`SuperMario World deployed at: ${superMarioWorld.address}`);
  await superMarioWorld.mint('https://ipfs.io/ipfs/QmasAgXS5sN6EiGXdjUgd1uAZ5oK2vaAeB7GGkQaixVa1w');
  console.log('NFT successfully minted');
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
