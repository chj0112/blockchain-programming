var Web3=require('web3');
var _abiBinJson = require('./Bank.json');      //importing a javascript file

//var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8345"));
var web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:8345"));
contractName=Object.keys(_abiBinJson.contracts); // reading ['src/Bank.sol:Bank']
//console.log("- contract name: ", contractName); //or console.log(contractName[0]);
_abiArray=_abiBinJson.contracts[contractName].abi; //use just as read from file
//_abiArray=JSON.parse(JSON.stringify(_abi));
//_abiArray=JSON.parse(_abi);      //JSON parsing needed!!
//_bin=_abiBinJson.contracts[contractName].bin;
//console.log("- ABI: " + _abiArray);
//console.log("- Bytecode: " + _bin);
var bank = new web3.eth.Contract(_abiArray,"0xA0376EB2e9274900772cAa2d676235790513a280");
var event = bank.events.PrintLog(function (error, result) {
    if (!error)
        console.log("Event fired: " + JSON.stringify(result.returnValues));
});
//console.log(bank.sendTo(0x778ea91cb0d0879c22ca20c5aea6fbf8cbeed480, 100,{from:web3.eth.accounts[0],gas:100000}));

async function doIt() {
    const accounts = await web3.eth.getAccounts();
    await bank.methods.deposit(11111).send({from: accounts[0], value: 11111});
    await bank.methods.deposit(222).send({from: accounts[0], value: 222});
    const bal1 = await bank.methods.getBalance().call()
    console.log("1. contract balance after deposit 11111 wei, 222 wei:", bal1, "\n");
    const balance2Before = await web3.eth.getBalance(accounts[1]);
    await bank.methods.forwardTo(accounts[1]).send({from: accounts[0], value: 333});
    const bal2 = await bank.methods.getBalance().call()
    console.log("2. contract balance after transfer 333 wei:", bal2);
    const balance2After = await web3.eth.getBalance(accounts[1]);
    console.log("before: ", balance2Before);
    console.log("after: ", balance2After);
    console.log("2nd account balance difference: ", balance2After-balance2Before, "\n");
    const balanceBefore = await web3.eth.getBalance(accounts[0]);
    await bank.methods.withdrawAll().send({from: accounts[0]});
    const balanceAfter = await web3.eth.getBalance(accounts[0]);
    const bal3 = await bank.methods.getBalance().call()
    console.log("3. contract balance after withdraw all:", bal3);
    console.log("before: ", balanceBefore);
    console.log("after: ", balanceAfter);
    console.log("account balance difference: ", balanceAfter-balanceBefore, "\n");
    await web3.eth.sendTransaction({from: accounts[0], to: "0xA0376EB2e9274900772cAa2d676235790513a280", data: "0x11", value: 111});
    const bal4 = await bank.methods.getBalance().call();
    console.log("4. contract balance after fallback called:", bal4);
    process.exit(1);
}
doIt()
