### Blockchain Tracking System

<p>The app gets asset/user/etc location and save a visited places history. It also alerts when asset arrives in a restricted/or other area. </p>

<div style="text-align: center;"><img src="https://github.com/vieiralc/blockchain-tracking/blob/master/img/capture.JPG" alt="capture"/></div>

### Instructions to run the Dapp

To update the smart contract logic:
`truffle migrate -f 3`

Install deps:

cd blockchain-tracking
npm install .
npm start

To acess go to: http://localhost:3000

-> git clone https://github.com/vieiralc/blockchain-tracking/
-> install ganache (https://truffleframework.com/ganache)
-> cd blockchain-tracking
-> truffle migrate --reset --network development

-> User must have a metamask account
-> Access localhost
-> Metamask will prompt to confirm the transaction
-> Click Confirm
-> Check visited places on MyPlaces (link on sidebar)

To deploy to ropsten:
-> get infura api key
-> get a mnemonic

PORT=3000 PORTIS_API=weouiwrwer node client/app.js