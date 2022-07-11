var Web3=require('web3');
var _abiBinJson = require('./MyNFT.json');      //importing a javascript file

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8345"));
//var web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:8345"));
contractName=Object.keys(_abiBinJson.contracts);
console.log("- contract name: ", contractName[12]);
_abiArray=_abiBinJson.contracts[contractName[12]].abi;
//_abiArray=JSON.parse(JSON.stringify(_abi));
//_abiArray=JSON.parse(_abi);      //JSON parsing needed!! //SyntaxError: Unexpected token o in JSON at position 1
_bin="0x"+_abiBinJson.contracts[contractName[12]].bin;
var _nft = new web3.eth.Contract(_abiArray,"0x98F9CB197E69d1537250Be5EefDa0B6586896949");
var event = _nft.events.Transfer({fromBlock: 0}, function (error, result) {
    if (!error) {
        console.log("Event fired: " + JSON.stringify(result.returnValues));
    }
});


async function doIt() {
    const accounts = await web3.eth.getAccounts();

    await _nft.methods.mintWithURI(accounts[1], https://ipfs.io/ipfs/QmYcHDtwa8iDqsFGBCjKC3N4FZZqh1T7qPXTYxMrp2htRo)
    .send({from: accounts[0], gas: 1000000})
    .then(function(res) {
        console.log(JSON.stringify(res));
    });
}
doIt()
