const MyGeoLocationStorage = artifacts.require("./MyGeoLocationStorage.sol");

module.exports = function(deployer) {
    deployer.deploy(MyGeoLocationStorage);
};