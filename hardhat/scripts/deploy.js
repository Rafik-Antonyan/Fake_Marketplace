const hre = require("hardhat");

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function main() {
  const nftContract = await hre.ethers.deployContract("CryptoDevsNFT")
  console.log("CryptoDevsNFT address", nftContract.target);

  const fakeNFTMarketPlaceContract = await hre.ethers.deployContract("FakeNFTMarketplace")
  console.log("FakeNFTMarketplace address", fakeNFTMarketPlaceContract.target);

  const daoContract = await hre.ethers.deployContract("CryptoDevsDAO", [
    fakeNFTMarketPlaceContract.target,
    nftContract.target
  ])
  console.log("CryptoDevsDAO address", daoContract.target);

  await sleep(30 * 1000)

  await hre.run("verify:verify", {
    address: nftContract.target,
    constructorArguments: []
  })

  await hre.run("verify:verify", {
    address: fakeNFTMarketPlaceContract.target,
    constructorArguments: []
  })

  await hre.run("verify:verify", {
    address: daoContract.target,
    constructorArguments: [
      fakeNFTMarketPlaceContract.target,
      nftContract.target
    ]
  })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
