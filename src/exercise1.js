miner.setEtherbase(eth.accounts[0]);
console.log("1. Block Number:", eth.blockNumber);
console.log("2. Enode:", admin.nodeInfo.enode);
console.log("3. PeerCount:", net.peerCount, "Peer:", admin.peers);
console.log("4. Accounts:", eth.accounts);
console.log("5. Account1 Balance:", web3.fromWei(eth.getBalance(eth.accounts[0]),"ether"));
console.log("5. Account2 Balance:", web3.fromWei(eth.getBalance(eth.accounts[1]),"ether"));
console.log("5. Account3 Balance:", web3.fromWei(eth.getBalance(eth.accounts[2]),"ether"));
console.log("6. Before Change:", eth.coinbase);
miner.setEtherbase(eth.accounts[1]);
console.log("6. After Change:", eth.coinbase);
console.log("7. Pending Transaction:", txpool.status.pending, "Queued Transaction:", txpool.status.queued);
console.log("-> 거래를 만들지 않았기 때문");
console.log("8. Block Number:", eth.blockNumber);
console.log("-> 블록번호 변동 없음, 마이닝 통한 블록생성이 없었기 때문");