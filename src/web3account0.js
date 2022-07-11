var Web3 = require('web3');
var web3 = new Web3('http://localhost:8345');
async function getAccount0() {
    accounts = await web3.eth.getAccounts();
    account0=accounts[0];
    console.log("coinbase: " + account0);
}
getAccount0()
