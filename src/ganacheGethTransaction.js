var Web3 = require('web3');
var web3 = new Web3('http://localhost:8345');
async function getCoinbaseBalance() {
    bal1 = await web3.eth.getBalance("0xFf21C21d7Cb3202073C2CE7aB0c141f56888D9e1");
    bal2 = await web3.eth.getBalance("0x40944b4662569d4099e55e77266075f017b8701d");
    console.log("send balance: ", web3.utils.fromWei(bal1, "ether"));
    console.log("receive balance: ", web3.utils.fromWei(bal2, "ether"));
    send = await web3.eth.sendTransaction({from:"0xFf21C21d7Cb3202073C2CE7aB0c141f56888D9e1", to: "0x40944b4662569d4099e55e77266075f017b8701d", value: 1000000000000000000});
    newBal1 = await web3.eth.getBalance("0xFf21C21d7Cb3202073C2CE7aB0c141f56888D9e1");
    newBal2 = await web3.eth.getBalance("0x40944b4662569d4099e55e77266075f017b8701d");
    console.log("new send balance: ", web3.utils.fromWei(newBal1, "ether"));
    console.log("new receive balance: ", web3.utils.fromWei(newBal2, "ether"));
}
getCoinbaseBalance()
