pragma solidity 0.4.24;

import "./MyGeoLocationStorage.sol";

contract MyGeoLocationTracker {
    
    event newLocation(address addr, bytes32 lat, bytes32 lng);
    MyGeoLocationStorage myGeoLocationStorage;
    
    constructor(address _myGeoLocationStorage) public {
        myGeoLocationStorage = MyGeoLocationStorage(_myGeoLocationStorage);
    }

    // setters
    function registerLocation(bytes32 lat, bytes32 lng) public {
        
        if (!checkUserExists(msg.sender))
            myGeoLocationStorage.registerUser(msg.sender);    

        myGeoLocationStorage.registerLocation(msg.sender, lat, lng);
        emit newLocation(msg.sender, lat, lng);
    }
    
    // only the user can see the places he visited
    function getUserLocations() public view returns (bytes32[] memory lat, bytes32[] memory lng) {
        require(checkUserExists(msg.sender), "User does not exists");
        return myGeoLocationStorage.getLocations(msg.sender);
    }
    
    function checkUserExists(address addr) public view returns (bool) {
        address[] memory users = myGeoLocationStorage.getUserAddresses();
        
        for (uint i = 0; i < users.length; i++) {
            if (users[i] == addr) {
                return true;
            } else {
                return false;
            }
        }
    }
}