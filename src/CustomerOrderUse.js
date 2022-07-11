var Web3=require('web3');
var web3=new Web3(new Web3.providers.HttpProvider("http://localhost:8345"));
var fs=require('fs');
var _str = fs.readFileSync("src/CustomerOrder.json");
var _json=JSON.parse(_str)
//var _abiArray=JSON.parse(_json.contracts.sHello2.abi);
//var _abiArray=JSON.parse(_json.contracts["src/CustomerOrder.sol:Order"].abi);
var _abiArray=_json.contracts["src/CustomerOrder.sol:Order"].abi;

var order = new web3.eth.Contract(_abiArray, "0xA224f074D809D291CdA9dd033bCa46064675FBeF");

async function doIt() {
    const accounts = await web3.eth.getAccounts();
    console.log("Account: " + accounts[0]);
    
    console.log("\n1-1");
    a1 = await web3.eth.getBalance(accounts[0]);
    a2 = await web3.eth.getBalance(accounts[1]);
    a3 = await web3.eth.getBalance(accounts[2]);
    console.log("Account 1 balance: " + a1);
    console.log("Account 2 balance: " + a2);
    console.log("Account 3 balance: " + a3);
    await web3.eth.getBlockNumber(function(err, res) {
        console.log("Blocknumber: " + res);
    });
    
    console.log("\n1-3");
    order.methods.addCustomer(111, "kim", "010-2017-1111", "111 hongji-dong jongro-gu seoul")
    .send({from: accounts[0], gas: 500000})
    .then(console.log("Customer 111 added"));
    order.methods.addCustomer(112, "lee", "010-2017-1112", "112 hongji-dong jongro-gu seoul")
    .send({from: accounts[1], gas: 500000})
    .then(console.log("Customer 112 added"));
    order.methods.addCustomer(113, "lim", "010-2017-1113", "113 hongji-dong jongro-gu seoul")
    .send({from: accounts[2], gas: 500000})
    .then(console.log("Customer 113 added"));
    
    console.log("\n1-4");
    await order.methods.getHomeAddress().call({from: accounts[0]}).then(function(home) {
        console.log("Account 1 home address: " + home);
    });
    await order.methods.getHomeAddress().call({from: accounts[1]}).then(function(home) {
        console.log("Account 2 home address: " + home);
    });
    await order.methods.getHomeAddress().call({from: accounts[2]}).then(function(home) {
        console.log("Account 3 home address: " + home);
    });
    
    console.log("\n1-5");
    await order.methods.placeOrder(555, "T-Shirt", 2, 1115).send({from: accounts[0], value: 1115, gas: 500000});
    await order.methods.placeOrder(556, "T-Shirt", 3, 1116).send({from: accounts[1], value: 1116, gas: 500000});
    await order.methods.placeOrder(557, "T-Shirt", 4, 1117).send({from: accounts[2], value: 1117, gas: 500000});
    console.log("Order placed");
    
    console.log("\n1-6");
    await order.methods.getNOrder().call({from: accounts[0]}).then(function(res) {
        console.log("Order number: " + res);
    });
    await order.methods.getTotalOrderAmount().call({from: accounts[0]}).then(function(res) {
        console.log("Total order amount: " + res);
    });
    await order.methods.queryBalance().call({from: accounts[0]}).then(function(res) {
        console.log("Query balance: " + res);
    });
    
    console.log("\n1-7");
    await order.methods.getOrderItem().call({from: accounts[0]}).then(function(res) {
        console.log("Account 1 order: " + JSON.stringify(res));
    });
    await order.methods.getOrderItem().call({from: accounts[1]}).then(function(res) {
        console.log("Account 2 order: " + JSON.stringify(res));
    });
    await order.methods.getOrderItem().call({from: accounts[2]}).then(function(res) {
        console.log("Account 3 order: " + JSON.stringify(res));
    });
    
    console.log("\n1-8");
    await order.methods.getOrderById(556).call().then(function(res) {
        console.log("ID 556 order: " + JSON.stringify(res));
    });
    
    console.log("\n1-9");
    await order.methods.refund(556).send({from: accounts[1], gas: 1000000}).then(console.log("Refunded"));
    
    console.log("\n1-10");
    await order.methods.getOrderById(556).call().then(function(res) {
        console.log("ID 556 order: " + JSON.stringify(res));
    });
    await order.methods.getNOrder().call({from: accounts[0]}).then(function(res) {
        console.log("Order number: " + res);
    });
    await order.methods.getTotalOrderAmount().call({from: accounts[0]}).then(function(res) {
        console.log("Total order amount: " + res);
    });
    await order.methods.queryBalance().call({from: accounts[0]}).then(function(res) {
        console.log("Query balance: " + res);
    });
}

doIt()
