var Web3 = require('web3');
var web3 = new Web3('http://localhost:8345');
async function mid1() {
    accounts = await web3.eth.getAccounts();
    account0=accounts[0];
    account1=accounts[1];
    console.log("(1) ac0: " + account0 + " ac1: " + account1);
    bal0 = await web3.eth.getBalance(account0);
    bal1 = await web3.eth.getBalance(account1);
    console.log("\n(2) bal Of ac0: " + bal0 + " ac1: " + bal1);
    account2=accounts[2];
    send = await web3.eth.sendTransaction({from:account0, to: account1, value: 1111});
    console.log("\n(3) callback - sending ac0 -> ac1")
    console.log("\n(4) transactionHash: " + JSON.stringify(send.transactionHash));
    gas = web3.eth.estimateGas;
    console.log("\n(5) gas costs: " + JSON.stringify(send.gasUsed));
    nonce = await web3.eth.getTransactionCount(account0);
    console.log("\n(6) nonce: " + nonce);
    newbal0 = await web3.eth.getBalance(account0);
    newbal1 = await web3.eth.getBalance(account1);
    baldiff0 = newbal0 - bal0;
    baldiff1 = newbal1 - bal1;
    console.log("\n(7) bal diff0: " + baldiff0 + " bal diff1: " + baldiff1);
    console.log("\n(8) adding balance")
    var sum = 0
    for (i=0; i<accounts.length; i++){
        bal = await web3.eth.getBalance(accounts[i]);
        console.log("sum: " + sum + " adding " + i + " bal: " + bal);
        sum += parseInt(bal);
    }
    console.log("\n(9) balance total: " + sum);
}
mid1()
