var SimpleStorage = artifacts.require("Math");

module.exports = function(deployer) {
  // Pass 42 to the contract as the first constructor parameter
  //deployer.deploy(SimpleStorage, 42, {privateFor: ["ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc="]})
  deployer.deploy(Math)
};
