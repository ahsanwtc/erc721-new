const { ethers } = require("hardhat");

async function main() {
  const SuperMarioWorld = await ethers.getContractFactory('SuperMarioWorldOZ');
  const superMarioWorld = await SuperMarioWorld.deploy('SuperMario World OZ', 'SPRMOZ');
  await superMarioWorld.deployed();
  console.log(`SuperMario World deployed at: ${superMarioWorld.address}`);
  await superMarioWorld.mint('ipfs://QmTkkFFnBUbZgtDGdCmmEzpYJMqXWjSwE1Vn1pQLPwCZ58');
  console.log('NFT successfully minted');
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
