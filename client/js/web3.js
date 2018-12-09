var contract;
var web3;
var portisProvider;

// GeoLocation Options
let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

window.addEventListener('load', function() {
  
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    //set the provider you want from Web3.providers
    PortisProvider = window.Portis.PortisProvider;
    web3 = new Web3(new PortisProvider({
        apiKey: "cec8b155d40ac0f2b4a44cd70d64ad0c",
        providerNodeUrl: 'http://localhost:7545'
    }));
  }
  
  // start the dapp:
  startApp();
});

function startApp() {
  
  const contractAddress = "0x4977c81cf6ef51e547e953e2a2f67521e34ac298";

  // contractABI is at contracts/contract_abi.js
  contract = new web3.eth.Contract(contractABI, contractAddress);
  
  // setting default account
  web3.eth.getAccounts()
    .then(accounts => {
      web3.eth.defaultAccount = accounts[0];
    })
  
  // detect if user is on mobile
  var md = new MobileDetect(window.navigator.userAgent);
  if (md.mobile()) {
    // Get current user's location
    setTimeout(() => {
      navigator.geolocation.getCurrentPosition(onSuccess, onError, options);   
    }, 2000)
  }
};

function onSuccess(pos) {
  
  let crd = pos.coords;
  let lat = web3.utils.asciiToHex(crd.latitude.toString());
  let lng = web3.utils.asciiToHex(crd.longitude.toString());

  // Check if user is using metamask or portis
  if (!web3.currentProvider.isPortis) {
    // if using matamask but not logged in
    if (!web3.eth.defaultAccount) 
      alert('Please Login on Metamask');
    else {
      registerLocation(web3.eth.defaultAccount, lat, lng);
    }
  } else {
    // if using portis wait for login
    web3.currentProvider.on('login', async result => {
      const accounts = await web3.eth.getAccounts()
      registerLocation(web3.eth.defaultAccount, lat, lng);
    });
  }

};

function onError(err) {
  alert(`Error ${err.code}: Unable to get user location. ${err.message}`);
};

function registerLocation(addr, lat, lng) {
  console.log(addr, lat, lng);
  // contract.methods.registerLocation(addr, lat, lng)
  //   .send({from: web3.eth.defaultAccount})
  //   .then(receipt => {
  //     console.log(receipt)
  //   })
}