const contractABI =  [
  {
    "inputs": [
      {
        "name": "_myGeoLocationStorage",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "addr",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "lat",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "lng",
        "type": "bytes32"
      }
    ],
    "name": "newLocation",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "lat",
        "type": "bytes32"
      },
      {
        "name": "lng",
        "type": "bytes32"
      }
    ],
    "name": "registerLocation",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getUserLocations",
    "outputs": [
      {
        "name": "lat",
        "type": "bytes32[]"
      },
      {
        "name": "lng",
        "type": "bytes32[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "checkUserExists",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]