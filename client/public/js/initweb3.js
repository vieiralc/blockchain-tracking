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
        //network: 'ropsten',
        providerNodeUrl: 'http://localhost:7545' // only on localhost
    }));
  }
  
  // start the dapp:
  startApp();
});

function startApp() {
  
  // scAddress is at contracts/contract_abi.js
  contract = new web3.eth.Contract(contractABI, scAddress);
  
  // setting default account
  web3.eth.getAccounts()
    .then(accounts => {
      web3.eth.defaultAccount = accounts[0];
    });
  
  // adds a listener for the events
  currentLocationListener();

  // detect if user is on mobile
  //var md = new MobileDetect(window.navigator.userAgent);
  //if (md.mobile()) {
    // Get current user's location
    //setTimeout(() => {
      if (!localStorage.getItem('AlreadyGotLocation')) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError, options);   
      } else {
        let crd = getLocalStorageCrds();
        let positionLatLng = new google.maps.LatLng(crd.lat, crd.lng);
        plotPosition(positionLatLng);
      }
    //}, 2000);
  //}
}

function onSuccess(pos) {
  
  let crd = pos.coords;
  let data = {};
  data.lat = web3.utils.asciiToHex(crd.latitude.toString());
  data.lng = web3.utils.asciiToHex(crd.longitude.toString());
  
  // Check if user is using metamask or portis
  if (!web3.currentProvider.isPortis) {
    // if using matamask but not logged in
    if (!web3.eth.defaultAccount) 
      alert('Please Login on Metamask');
    else {
      registerLocation(web3.eth.defaultAccount, data);
    }
  } else {
    // if using portis wait for login
    web3.currentProvider.on('login', async result => {
      const accounts = await web3.eth.getAccounts();
      registerLocation(accounts[0], data);
    });
  }

}

function onError(err) {
  alert(`Error ${err.code}: Unable to get user location. ${err.message}`);
}

// Contract registerLocation
function registerLocation(addr, data) {
  contract.methods.registerLocation(data.lat, data.lng)
    .send({from: addr})
    .then(receipt => {
      saveToLocalStorage(data);
    });
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

  if (isUserInNotAllowedArea) {
    $('#myAlert').removeClass("invisible");
    setTimeout(() => {
      $('#myAlert').addClass("invisible");
    }, 4000)
  }
  
}

function saveToLocalStorage(data) {
  let saveData = {};
  saveData.obj = data;
  saveData.time = new Date().getTime();
  localStorage.setItem('AlreadyGotLocation', JSON.stringify(saveData));
}

function getLocalStorageCrds() {
  let data = JSON.parse(localStorage.getItem('AlreadyGotLocation'));
  let lat = web3.utils.toAscii(data.obj.lat);
  let lng = web3.utils.toAscii(data.obj.lng);
  let json = {
    lat: lat,
    lng: lng
  }
  
  return json;
}