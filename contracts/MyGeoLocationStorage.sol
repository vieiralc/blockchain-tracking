pragma solidity 0.4.24;

contract MyGeoLocationStorage {

    struct user {
        bytes32[] lat;
        bytes32[] lng;
    }
    
    mapping (address => user) userObj; 
    mapping (address => bool) accessAllowed;
    address[] public users;

    constructor() public {
        accessAllowed[msg.sender] = true;
    }

    modifier platform() {
        require(accessAllowed[msg.sender] == true, "You must be authorized");
        _;
    }

    function allowAccess(address _address) public platform {
        accessAllowed[_address] = true;
    }
    
    function denyAccess(address _address) public platform {
        accessAllowed[_address] = false;
    }

    // setters
    function registerLocation(address addr, bytes32 lat, bytes32 lng) public platform {
        userObj[addr].lat.push(lat);
        userObj[addr].lng.push(lng);
    }

    function registerUser(address addr) public platform {
        users.push(addr);
    }

    // getters
    function getLocations(address addr) public view platform returns (bytes32[] memory lat, bytes32[] memory lng) {
        lat = userObj[addr].lat;
        lng = userObj[addr].lng;

        return(lat, lng);
    }

    function getUserAddresses() public view platform returns (address[] memory) {
        return users;
    }
}