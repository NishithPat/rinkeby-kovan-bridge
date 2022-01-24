require('dotenv').config();

const Web3 = require("web3");
const Provider = require("@truffle/hdwallet-provider");
const TokenA = require("../build/contracts/TokenA.json");
const TokenB = require("../build/contracts/TokenB.json");
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

const web3Rinkeby = new Web3(new Web3.providers.WebsocketProvider(`wss://rinkeby.infura.io/ws/v3/${process.env.INFURA_KEY}`));

const providerKovan = new Provider(mnemonic, `wss://kovan.infura.io/ws/v3/${process.env.INFURA_KEY}`);
const web3Kovan = new Web3(providerKovan);

const tokenA = new web3Rinkeby.eth.Contract(TokenA.abi, TokenA.networks["4"].address);
const tokenB = new web3Kovan.eth.Contract(TokenB.abi, TokenB.networks["42"].address);

tokenA.events.SentToChainB()
    .on("connected", (subscriptionId) => {
        console.log(subscriptionId);
    })
    .on("data", async (event) => {
        const data = event.returnValues;
        console.log(data.sender);

        const tx = await tokenB.methods.receiveFromChainA(data.amount, data.sender).send({ from: process.env.ADDRESS });

        console.log(tx);
    })

// tokenA.getPastEvents('SentToChainB', {
//     fromBlock: 0,
//     toBlock: 'latest'
// },
//     function (error, result) {

//         console.log(result)

//     });

