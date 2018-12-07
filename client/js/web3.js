var web3;

window.addEventListener('load', function() {

    // Verificando se o Web3 foi injetado pelo navegador (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      // Use o provedor de Mist/MetaMask
      web3 = new Web3(window.web3.currentProvider);
      console.log("teste")
    } else {
      // Caso o usuário não tem web3. Provavelmente
      // mostre a ele uma mensagem dizendo-lhe para instalar o Metamask
      // afim de usar nosso aplicativo.
      web3 = new Web3(window.web3.currentProvider);
      console.log(window.web3)
    }
  
    // Agora você pode iniciar seu aplicativo e acessar o web3js livremente:
    //startApp()
  
})

function startApp() {
  const contractAddress = "0x345ca3e014aaf5dca488057592ee47305d9b3e10";

  // contractABI is at contracts/contract_abi.js
  const contract = new Web3.eth.contract(contractABI, contractAddress);
  console.log(contract.address) 
}