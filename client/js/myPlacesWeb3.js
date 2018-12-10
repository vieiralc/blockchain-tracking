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
        apiKey: cec8b155d40ac0f2b4a44cd70d64ad0c,
        network: 'ropsten',
    }));
  }
  
  // start the dapp:
  startApp();
});

async function startApp() {
    const contractAddress = "0x2c2b9c9a4a25e24b174f26114e8926a9f2128fe4";

    // contractABI is at contracts/contract_abi.js
    contract = new web3.eth.Contract(contractABI, contractAddress);

    // setting default account
    await web3.eth.getAccounts()
        .then(accounts => {
            web3.eth.defaultAccount = accounts[0];
        });
    
    // Plot user places history
    contract.methods.getUserLocations(web3.eth.defaultAccount)
        .call({from: web3.eth.defaultAccount})
        .then(res => {
            for (var i = 0; i < res.lat.length; i++) {
                let lat = parseFloat(web3.utils.toAscii(res.lat[i]));
                let lng = parseFloat(web3.utils.toAscii(res.lng[i]));
                let positionLatLng = new google.maps.LatLng(lat, lng);
                plotPosition(positionLatLng);
            }
        })
}

function plotPosition(positionLatLng) {
    var contentString = `
      <span> User was here </span>
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