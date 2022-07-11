var Web3=require('web3');
var _abiBinJson = require('./Even.json');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8345"));
contractName=Object.keys(_abiBinJson.contracts);
_abi=_abiBinJson.contracts[contractName].abi;
_abiArray=JSON.parse(_abi);
var counter = new web3.eth.Contract(_abiArray,"0xF25a4A7E08aC4E983BDAc957Aa400ee400c959e3");
async function doIt() {
    const accounts = await web3.eth.getAccounts();
    counter.methods.getCounter().call().then(function(str) {console.log("0: " + str);});
    await counter.methods.add().send({from:accounts[0],gas:100000});
    counter.methods.getCounter().call().then(function(str) {console.log("1: " + str);});
    await counter.methods.add().send({from:accounts[0],gas:100000});
    counter.methods.getCounter().call().then(function(str) {console.log("2: " + str);});
    await counter.methods.add().send({from:accounts[0],gas:100000});
    counter.methods.getCounter().call().then(function(str) {console.log("3: " + str);});
    await counter.methods.add().send({from:accounts[0],gas:100000});
    counter.methods.getCounter().call().then(function(str) {console.log("4: " + str);});
    counter.methods.isEven().call().then(function(str) {console.log("4: " + str);});
}
doIt()
