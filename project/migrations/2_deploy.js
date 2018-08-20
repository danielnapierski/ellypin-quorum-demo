var Math = artifacts.require("Math");
var SafeMath = artifacts.require("SafeMath");
var AddressUtils = artifacts.require("AddressUtils");
var SupportsInterfaceWithLookup = artifacts.require("SupportsInterfaceWithLookup");
var ERC721Token = artifacts.require("ERC721Token");
var SimpleStorage = artifacts.require("SimpleStorage");

module.exports = function(deployer) {
    deployer.deploy(SimpleStorage, {from:web3.eth.accounts[0], gas: 0x47b760, privateFor: ["ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc="]});
    deployer.deploy(Math);
    deployer.deploy(SafeMath);
    deployer.deploy(AddressUtils);
    deployer.deploy(SupportsInterfaceWithLookup);
    deployer.deploy(ERC721Token, "HnH000001", "eGBS");
};
