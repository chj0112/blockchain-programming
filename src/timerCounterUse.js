var Web3=require('web3');
var _abiBinJson = require('./TimerCounter.json');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8345"));
contractName=Object.keys(_abiBinJson.contracts);
_abi=_abiBinJson.contracts[contractName].abi;
_abiArray=JSON.parse(_abi);
var TC = new web3.eth.Contract(_abiArray,"0x2d0a3808593D3EF9cFE89f794B568360CBb77d9E");
async function doIt() {
    const accounts = await web3.eth.getAccounts();
    console.log("Call from: " + accounts[0]);
    var start = await TC.methods.getNow().call();
    console.log("start time: "+ start);
    TC.methods.getCounter().call().then(function(str) {console.log("before: "+str);});
    await TC.methods.add().send({from:accounts[0],gas:100000});
    await TC.methods.add().send({from:accounts[0],gas:100000});
    await TC.methods.add().send({from:accounts[0],gas:100000});
    var stop = await TC.methods.getNow().call();
    console.log("stop time: "+ stop);
    TC.methods.getCounter().call().then(function(str) {console.log("after: "+str);});
    var time = await stop - start;
    console.log("time: "+ time);
    
}
doIt()
