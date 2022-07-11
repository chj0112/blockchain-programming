var Web3=require('web3');
var web3=new Web3(new Web3.providers.HttpProvider("http://localhost:8345"));
var fs=require('fs');
var _str = fs.readFileSync("src/Rsp.json");
var _json=JSON.parse(_str)
var _abiArray = _json.contracts["src/Rsp.sol:Rsp"].abi;

var rsp = new web3.eth.Contract(_abiArray, "0x24F0E92536C94d506Bf9426d54429bF01e7e7Ca3");
async function doIt() {
    const accounts = await web3.eth.getAccounts();
    console.log("Account: " + accounts[0]);
    await rsp.methods.depositA(10000).send({from: accounts[0], value: 10000});
    await rsp.methods.depositB(20000).send({from: accounts[0], value: 20000});
    var before = await rsp.methods.getBalance().call();
    console.log("Balance before\nA: " + before[0] + " B: " + before[1] + " Total: " + before[2]);
    await rsp.methods.setA().send({from: accounts[0]});
    console.log("B is Rock");
    await rsp.methods.setB(1000, "Rock").send({from: accounts[0]});
    await rsp.methods.play().send({from: accounts[0]});
    await rsp.methods.distributeBetAmount().send({from: accounts[0]});
    var result = await rsp.methods.getMatchResult().call();
    console.log(result);
    var after = await rsp.methods.getBalance().call();
    console.log("Balance after\nA: " + after[0] + " B: " + after[1] + " Total: " + after[2] + "\n");
    
    before = await rsp.methods.getBalance().call();
    console.log("Balance before\nA: " + before[0] + " B: " + before[1] + " Total: " + before[2]);
    console.log("B is Scissors");
    await rsp.methods.setB(1000, "Scissors").send({from: accounts[0]});
    await rsp.methods.play().send({from: accounts[0]});
    await rsp.methods.distributeBetAmount().send({from: accounts[0]});
    var result = await rsp.methods.getMatchResult().call();
    console.log(result);
    after = await rsp.methods.getBalance().call();
    console.log("Balance after\nA: " + after[0] + " B: " + after[1] + " Total: " + after[2] + "\n");
    
    before = await rsp.methods.getBalance().call();
    console.log("Balance before\nA: " + before[0] + " B: " + before[1] + " Total: " + before[2]);
    console.log("B is Paper");
    await rsp.methods.setB(1000, "Paper").send({from: accounts[0]});
    await rsp.methods.play().send({from: accounts[0]});
    await rsp.methods.distributeBetAmount().send({from: accounts[0]});
    var result = await rsp.methods.getMatchResult().call();
    console.log(result);
    after = await rsp.methods.getBalance().call();
    console.log("Balance after\nA: " + after[0] + " B: " + after[1] + " Total: " + after[2] + "\n");
}

doIt()
