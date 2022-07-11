var Web3=require('web3');
var web3=new Web3(new Web3.providers.HttpProvider("http://localhost:8345"));       //nok
//var web3 = new Web3(new Web3.providers.WebsocketProvider("http://117.16.44.45:8345"));  //ok
//var web3 = new Web3(new Web3.providers.WebsocketProvider("ws://117.16.44.45:8345"));  //ok
var fs=require('fs');
var _str = fs.readFileSync("src/Area.json");
var _json = JSON.parse(_str)
//var _abiArray = JSON.parse(_json.contracts.Area.abi);
//var _abiArray = JSON.parse(_json.contracts["src/Area.sol:Area"].abi);
var _abiArray = _json.contracts["src/Area.sol:Area"].abi;

async function doIt() {
    var hello = new web3.eth.Contract(_abiArray, "0xaCf37c2Ff04c20f62DC48c4a67B0B15F46390468");
    const accounts = await web3.eth.getAccounts();
    console.log("Account: " + accounts[0]);
    const balanceBefore = await web3.eth.getBalance(accounts[0]);
    console.log("Balance before: " + balanceBefore);
    // do by the Square address as set in the constructor
    hello.methods.getAddressOfSquare().call(function(err, c1addr) {
        if(!err) console.log(">> Square address by 'new': "+c1addr);
    });
    await hello.methods.setLength(10).send({from: accounts[0]});
    hello.methods.getLength().call().then(console.log);
    hello.methods.calcArea().call().then(console.log);
    hello.methods.getDegree().call().then(console.log);
    hello.methods.getAddressOfSquare().call().then(console.log);
    //redo by the Square address as changed by changeSquare()
    await hello.methods.changeSquare('0x7A262daF562F4041f32027b12CdcA362F0465A8f').send({from: accounts[0]});
    hello.methods.getAddressOfSquare().call(function(err, c1addr) {
        if(!err) console.log(">> Square address by 'changeSquare: "+c1addr);
    });
    await hello.methods.setLength(10).send({from: accounts[0]});
    hello.methods.getLength().call().then(console.log);
    hello.methods.calcArea().call().then(console.log);
    hello.methods.getDegree().call().then(console.log);
    hello.methods.getAddressOfSquare().call().then(console.log);
    const balanceAfter = await web3.eth.getBalance(accounts[0]);
    console.log("Balance after: " + balanceAfter);
    console.log("Balance diff: " + (balanceBefore - balanceAfter));
}

doIt()
