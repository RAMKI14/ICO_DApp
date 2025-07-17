const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const network = await hre.ethers.provider.getNetwork();
  console.log("Network:", network.name);

  //Deploying the TOKENICO CONTRACT
  console.log("Deploying TokenICO contract...");
  const TokenICO = await hre.ethers.getContractFactory("TokenICO");
  const tokenICO = await TokenICO.deploy();

  await tokenICO.deployed();

  console.log("\nDeployment Successful!");
  console.log("------------------------------");
  console.log("\nNEXT_PUBLIC_TOKEN_ICO_ADDRESS:", tokenICO.address);
  console.log("\nNEXT_PUBLIC_OWNER_ADDRESS:", deployer.address);

  //TOKEN CONTRACT DEPLOYMENT
  console.log("\nDeploying LINKTUM contract...");
  const LINKTUM = await hre.ethers.getContractFactory("LINKTUM");
  const lINKTUM = await LINKTUM.deploy();

  await lINKTUM.deployed();

  console.log("\nDeployment Successful!");
  console.log("------------------------------");
  console.log("\nNEXT_PUBLIC_lINKTUM_ADDRESS:", lINKTUM.address);
  console.log("\nNEXT_PUBLIC_OWNER_ADDRESS:", deployer.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
