var contract;
var web3;
var portisProvider;

window.addEventListener('load', function() {
  
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    //set the provider you want from Web3.providers
    PortisProvider = window.Portis.PortisProvider;
    web3 = new Web3(new PortisProvider({
        apiKey: "cec8b155d40ac0f2b4a44cd70d64ad0c",
        //network: 'ropsten',
        providerNodeUrl: 'http://localhost:7545' // only on localhost
    }));
  }
  
  // start the dapp:
  startApp();
});

async function startApp() {
    const contractAddress = "0x8f0483125fcb9aaaefa9209d8e9d7b9c8b9fb90f";

    // contractABI is at contracts/contract_abi.js
    contract = new web3.eth.Contract(contractABI, contractAddress);

    // setting default account
    await web3.eth.getAccounts()
        .then(accounts => {
            web3.eth.defaultAccount = accounts[0];
        });
    
    // Plot user places history
    contract.methods.getUserLocations()
        .call({from: web3.eth.defaultAccount})
        .then(res => {
            for (var i = 0; i < res.lat.length; i++) {
                let lat = parseFloat(web3.utils.toAscii(res.lat[i]));
                let lng = parseFloat(web3.utils.toAscii(res.lng[i]));
                let positionLatLng = new google.maps.LatLng(lat, lng);
                plotPosition(positionLatLng, web3.eth.defaultAccount);
            }
        })
}

function plotPosition(positionLatLng, defaultAccount) {
    var contentString = `
      <span> User ${defaultAccount.substring(0,5)} was here </span>
    `;
  
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
  
    var marker = new google.maps.Marker({
      position: positionLatLng,
      title: 'User was here',
      map: map,
      draggable: false
    });
  
    marker.addListener('click', () => {
      infowindow.open(map, marker);
    });
  }