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
        network: 'ropsten'
    }));
  }
  
  // start the dapp:
  startApp();
});

function startApp() {
  
  const contractAddress = "0xB386d866Df58ADe84E0A2aF87e7170d237b900e1";

  // contractABI is at contracts/contract_abi.js
  contract = new web3.eth.Contract(contractABI, contractAddress);
  
  // setting default account
  web3.eth.getAccounts()
    .then(accounts => {
      web3.eth.defaultAccount = accounts[0];
    });
  
  // adds and listener for the events
  currentLocationListener();

  // detect if user is on mobile
  var md = new MobileDetect(window.navigator.userAgent);
  if (md.mobile()) {
    // Get current user's location
    setTimeout(() => {
      navigator.geolocation.getCurrentPosition(onSuccess, onError, options);   
    }, 2000);
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
      const accounts = await web3.eth.getAccounts();
      registerLocation(web3.eth.defaultAccount, lat, lng);
    });
  }

};

function onError(err) {
  alert(`Error ${err.code}: Unable to get user location. ${err.message}`);
};

// Contract registerLocation
function registerLocation(addr, lat, lng) {
  contract.methods.registerLocation(addr, lat, lng)
    .send({from: web3.eth.defaultAccount})
    .then(receipt => {
      console.log(receipt);
    })
}

// Contract Listener
function currentLocationListener() {
  contract.events.newLocation({ fromBlock: 'latest' })
    .on('data', event => {
      let lat = parseFloat(web3.utils.toAscii(event.returnValues.lat));
      let lng = parseFloat(web3.utils.toAscii(event.returnValues.lng));
      let positionLatLng = new google.maps.LatLng(lat, lng);
      plotPosition(positionLatLng);
      checkAllowedArea(positionLatLng);
    })
    .on('error', console.error)
}

// Plot current users position
function plotPosition(positionLatLng) {
  var contentString = `
    <span> Current user location </span>
  `;

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    position: positionLatLng,
    title: 'Current Location',
    map: map,
    draggable: false
  });

  marker.addListener('click', () => {
    infowindow.open(map, marker);
  });
}

// Check if user is at an allowed area
function checkAllowedArea(positionLatLng) {
  let isUserInNotAllowedArea;
  
  bounds.forEach(bound => {
    if (bound.contains(positionLatLng))
      isUserInNotAllowedArea = true;
  })
  
  // TODO: Use Jquery to render message 
}