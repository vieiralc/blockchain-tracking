### Blockchain Tracking System

<p>The app saves asset/user/etc location. It also alerts when asset arrives in a restricted/or other area. </p>

<div style="text-align: center;"><img src="https://github.com/vieiralc/blockchain-tracking/blob/master/img/capture.JPG" alt="capture"/></div>

### Instructions to run the Dapp

#### Requirements:

<ul>
  <li> Ganache (https://truffleframework.com/ganache) </li>
  <li> Node & Npm </li>
</ul>

#### Optional:
<ul>
  <li> MetaMask (https://metamask.io) </li>
</ul>

<p> If you're using Ganache you must be logged in on the correct chain (localhost:7545 or other) </p>

###### Deploy the Smart Contract to Ganache Local Blockchain

```
 run Ganache
 truffle migrate --reset --network development (to deploy to local test blockchain)
 truffle migrate --reset --network ropsten (to deploy to ropsten)
```

###### Install deps:

```
cd blockchain-tracking
npm install .
npm start
```

To acess go to: http://localhost:5000

###### To update the smart contract:
<p>Change its logic and then run:</p>
 
 `truffle migrate -f 3`
