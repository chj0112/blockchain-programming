var Web3=require('web3');
var _abiBinJson = require('./multiply7.json');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8345"));
contractName=Object.keys(_abiBinJson.contracts);
_abi=_abiBinJson.contracts[contractName].abi;
_abiArray=JSON.parse(_abi);
var multi = new web3.eth.Contract(_abiArray,"0xA388C6253ac117DfC361c969529Aa56170Db6d72");
multi.methods.multiply(8).call().then(function(str) {console.log(str)});
