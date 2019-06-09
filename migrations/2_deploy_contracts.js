var LinkShortner = artifacts.require("./LinkShortner.sol");

module.exports = function(deployer) {
  deployer.deploy(LinkShortner);
};
