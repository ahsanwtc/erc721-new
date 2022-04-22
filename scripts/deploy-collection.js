const { ethers } = require("hardhat");

async function main() {
  const SuperMarioWorld = await ethers.getContractFactory('SuperMarioWorldCollection');
  const superMarioWorld = await SuperMarioWorld.deploy(
    'Super Mario World Collection', 'SPMK', 'ipfs://QmPBzLz8GNBSSZNGC8TJkFV6mqUg2Yr24pbnvAzD5UVP7x/'
  );
  await superMarioWorld.deployed();
  console.log(`SuperMario World deployed at: ${superMarioWorld.address}`);
  
  const normalAmount = 10, rareAmount = 1;

  await superMarioWorld.mint(normalAmount); // 1. Mario
  await superMarioWorld.mint(normalAmount); // 2. Luigi
  await superMarioWorld.mint(normalAmount); // 3. Yoshi
  await superMarioWorld.mint(normalAmount); // 4. Donkey Kong
  await superMarioWorld.mint(rareAmount); // 5. Mario Gold (rare)
  await superMarioWorld.mint(rareAmount); // 6. Luigi Gold (rare)
  await superMarioWorld.mint(rareAmount); // 7. Yoshi Gold (rare)
  await superMarioWorld.mint(rareAmount); // 8. Donkey Kong Gold (rare)
  console.log('NFT successfully minted');
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
