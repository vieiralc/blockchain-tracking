pragma solidity 0.5.0;

contract MyGeoLocationTracker {
    
    event newLocation(address addr, bytes32 lat, bytes32 lng);
    
    struct user {
        bytes32[] lat;
        bytes32[] lng;
    }
    
    mapping (address => user) userObj; 
    address[] public users;
    
    function registerLocation(address addr, bytes32 lat, bytes32 lng) public {
        
        if (!checkUserExists(addr))
            users.push(addr);    

        userObj[addr].lat.push(lat);
        userObj[addr].lng.push(lng);
        
        emit newLocation(addr, lat, lng);
    }
    
    function getUserLocations(address addr) public view returns (bytes32[] memory lat, bytes32[] memory lng) {
        
        require(checkUserExists(addr), "User does not exists");
        
        lat = userObj[addr].lat;
        lng = userObj[addr].lng;

        return (lat, lng);
    }
    
    function checkUserExists(address addr) public view returns (bool) {
        for (uint i = 0; i < users.length; i++) {
            if (users[i] == addr) {
                return true;
            } else {
                return false;
            }
        }
    }
}