var Web3=require('web3');
var _abiBinJson = require('./Counter.json');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8345"));
contractName=Object.keys(_abiBinJson.contracts);
_abi=_abiBinJson.contracts[contractName].abi;
_abiArray=JSON.parse(_abi);
var counter = new web3.eth.Contract(_abiArray,"0x2EC142116D6Ec1608a24865b69928d9E8b82c33B");
async function doIt() {
    const accounts = await web3.eth.getAccounts();
    await counter.methods.add().send({from:accounts[0],gas:100000});
    counter.methods.getCount().call().then(function(str) {console.log(str);});
    await counter.methods.setTimeCalled().send({from:accounts[0],gas:100000});
    counter.methods.getTimeCalled().call().then(function(str) {console.log(str)});
}
doIt()
