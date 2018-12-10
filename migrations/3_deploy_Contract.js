var MyGeoLocationTracker = artifacts.require("./MyGeoLocationTracker.sol");
var MyGeoLocationStorage = artifacts.require("./MyGeoLocationStorage.sol");

module.exports = function(deployer) {
    deployer.deploy(MyGeoLocationTracker, MyGeoLocationStorage.address)
        .then(() => {
            MyGeoLocationStorage.deployed()
                .then(instance => {
                    return instance.allowAccess(MyGeoLocationTracker.address);
                });
        });
};