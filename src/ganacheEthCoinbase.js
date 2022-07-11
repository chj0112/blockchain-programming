var Web3 = require('Web3');
var web3 = new Web3('http://localhost:8345');
async function getAccount0() {
    accounts = await web3.eth.getAccounts();
    account0=accounts[0];
    bal0 = await web3.eth.getBalance(account0);
    console.log("coinbase balance: " + web3.utils.fromWei(bal0, "ether"));
}
getAccount0()
