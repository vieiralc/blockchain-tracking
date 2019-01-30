const scAddress = "0x8f0483125FCb9aaAEFA9209D8E9d7b9C8B9Fb90F";
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
    "type": "constructor",
    "signature": "constructor"
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
      },
      {
        "indexed": false,
        "name": "date",
        "type": "bytes32"
      }
    ],
    "name": "newLocation",
    "type": "event",
    "signature": "0x7d0d8b0dd1434860bc2baf6a3570552defc6b764c640cedf03a3ec1a29692cd7"
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
      },
      {
        "name": "date",
        "type": "bytes32"
      }
    ],
    "name": "registerLocation",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xd5dc8d05"
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
      },
      {
        "name": "date",
        "type": "bytes32[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x3a53cdc4"
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
    "type": "function",
    "signature": "0x133f50f5"
  }
]