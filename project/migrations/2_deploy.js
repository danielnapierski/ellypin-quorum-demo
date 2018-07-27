var Math = artifacts.require("Math");
var SafeMath = artifacts.require("SafeMath");
var AddressUtils = artifacts.require("AddressUtils");
var SupportsInterfaceWithLookup = artifacts.require("SupportsInterfaceWithLookup");
var ERC721Token = artifacts.require("ERC721Token");

module.exports = function(deployer) {
    deployer.deploy(Math);
    deployer.deploy(SafeMath);
    deployer.deploy(AddressUtils);
    deployer.deploy(SupportsInterfaceWithLookup);
    deployer.deploy(ERC721Token, "HnH000001", "eGBS");
};
