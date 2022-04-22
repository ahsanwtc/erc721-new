const { ethers } = require("hardhat");

async function main() {
  const SuperMarioWorld = await ethers.getContractFactory('SuperMarioWorldERC1155');
  const superMarioWorld = await SuperMarioWorld.deploy('SuperMario World ERC1155', 'SPRME');
  await superMarioWorld.deployed();
  console.log(`SuperMario World deployed at: ${superMarioWorld.address}`);
  await superMarioWorld.mint(10, 'ipfs://QmRwQUAv5mbuy1HaL32F6T99obHkLa7kEz1MqxgWcZ9WFz');
  console.log('NFT successfully minted');
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
