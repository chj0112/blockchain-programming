var Web3=require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8345"));
var shelloContract = new web3.eth.Contract([{"constant":true,"inputs":[],"name":"sayHello","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"}],
                                      "0x0EF8C25Fb084C7FF83fB21aE4512c7A9908952ED");
shelloContract.methods.sayHello().call().then(function(str) {console.log(str);});
