const MyGeoLocationTracker = artifacts.require("./MyGeoLocationTracker.sol");

module.exports = function(deployer) {
    deployer.deploy(MyGeoLocationTracker);
};