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
var _nft = new web3.eth.Contract(_abiArray,"0x9826e08Efb0a5768DD142e6B5Be540e0BB1230f7");
var event = _nft.events.Transfer({fromBlock: 0}, function (error, result) {
    if (!error) {
        console.log("Event fired: " + JSON.stringify(result.returnValues));
    }
});


async function doIt() {
    const accounts = await web3.eth.getAccounts();

    console.log(accounts[0], accounts[1], accounts[2]);
    await _nft.methods.mintWithURI(accounts[1], "https://ipfs.io/ipfs/QmYcHDtwa8iDqsFGBCjKC3N4FZZqh1T7qPXTYxMrp2htRo")
    .send({from: accounts[0], gas: 1000000})
    .then(function(res) {
        console.log("(8) minting from " + res.from + " to " + res.events.Transfer.returnValues.to);
    });
    
    await _nft.methods.mintWithURI(accounts[2], "https://ipfs.io/ipfs/QmYknG3ST5BRp6tZRvwXkaWZAAcQiJSwacZ6UFEYvbwpNk")
    .send({from: accounts[0], gas: 1000000})
    .then(function(res) {
        console.log("(9) minting from " + res.from + " to " + res.events.Transfer.returnValues.to);
    });
    
    await _nft.methods.getItemsLength().call().then(function(res) {
        console.log("(10) " + res);
    });
    
    console.log("(11) no solution");
    
    await _nft.methods.getTokenURI(1).call().then(function(res) {
        console.log("(12) tokenURI of tokenId 1: " + res)
    })
    await _nft.methods.getTokenIdToItem(1).call().then(function(res) {
        console.log("(13) tokenId 1: " + JSON.stringify(res));
    });

    await _nft.methods.myTransfer(accounts[1], accounts[2], 1).send({from: accounts[0], gas: 1000000});
    
}
doIt()
