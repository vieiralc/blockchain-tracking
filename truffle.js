require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  
  networks: {
    development: {
      host: "localhost",
      port: "7545",
      network_id: "*"
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          `https://ropsten.infura.io/v3/${process.env.infuraKey}`
        );
      },
      gasPrice: 25000000000,
      network_id: 3
    }

  },

  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};