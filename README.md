
To update the smart contract logic:
`truffle migrate -f 3`

Visited places history:

![alt text](https://github.com/vieiralc/blockchain-tracking/blob/master/capture.JPG)

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