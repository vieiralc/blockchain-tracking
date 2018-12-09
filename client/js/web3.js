var contract;
var web3;

window.addEventListener('load', function() {
  
  if (window.web3) {
    web3 = window.web3;
  } else {
    var web3 = window.web3;
    // const provider = new Web3(new PortisProvider({
    //     apiKey: process.env.REACT_APP_PORTIS,
    //     providerNodeUrl: "http://localhost:7545"
    // }));
    // var web3js = new Web3(provider);
    // console.log("No web3 instance injected, using Local web3.");
  }

  // Agora você pode iniciar seu aplicativo e acessar o web3js livremente:
  startApp()
})

function startApp() {
  const contractAddress = "0x345ca3e014aaf5dca488057592ee47305d9b3e10";

  // contractABI is at contracts/contract_abi.js
  contract = new web3.eth.contract(contractABI).at(contractAddress);
  
  console.log(web3)
}