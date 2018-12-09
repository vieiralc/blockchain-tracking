var contract;
var web3;
var portisProvider;
var defaultAccount;
var isLoggedIn;

window.addEventListener('load', async function() {
  
  if (typeof web3 !== 'undefined') {

    web3 = await new Web3(web3.currentProvider);
  } else {
    
    // set the provider you want from Web3.providers
    PortisProvider = window.Portis.PortisProvider;
    web3 = await new Web3(new PortisProvider({
        apiKey: "cec8b155d40ac0f2b4a44cd70d64ad0c",
        providerNodeUrl: 'http://localhost:7545'
    }));
  }
  
  // Agora você pode iniciar seu aplicativo e acessar o web3js livremente:
  startApp()
})

async function startApp() {
  
  const contractAddress = "0x4977c81cf6ef51e547e953e2a2f67521e34ac298";

  // contractABI is at contracts/contract_abi.js
  contract = await new web3.eth.Contract(contractABI, contractAddress);
  
  await web3.eth.getAccounts()
    .then(accounts => {
      web3.eth.defaultAccount = accounts[0];
    })
  

  web3.eth.net.isListening()
    .then(res => {
      if (res && !web3.eth.defaultAccount)
        isLoggedIn = true;
      else
        isLoggedIn = false;
    });
  
  // var lat = web3.utils.asciiToHex("-15.83684779");
  // var lng = web3.utils.asciiToHex("-47.87309647");

  // contract.methods.registerLocation(web3.eth.defaultAccount, lat, lng)
  //   .send({from: web3.eth.defaultAccount})
  //   .then(receipt => {
  //     console.log(receipt)
  //   })
}

function registerLocations(addr, lat, lng) {
  
}