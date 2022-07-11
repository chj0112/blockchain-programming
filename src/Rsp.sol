//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

contract Rsp {
    struct Member {
        string name;
        uint betMoney;
        uint whatRsp;
    }
    Member a;
    Member b;
    address owner;
    address addrA = 0x0000000000000000000000000000000000000000;
    address addrB = 0x0000000000000000000000000000000000000001;
    string[3] matchResult = ["A wins", "B wins", "tie"];
    uint result = 3;
    mapping (address => uint) balanceOf;
    constructor() {
        owner = msg.sender;
    }
    function depositA(uint amount) payable public onlyOwner {
        require(msg.value == amount);
        balanceOf[addrA] += amount;
    }
    function depositB(uint amount) payable public onlyOwner {
        require(msg.value == amount);
        balanceOf[addrB] += amount;
    }
    function getBalance() public view returns(uint, uint, uint) {
        return (balanceOf[addrA], balanceOf[addrB], address(this).balance);
    }
    function setA() public {
        require(balanceOf[addrA] >= 1000);
        uint rand = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)))%3;
        a = Member("A", 1000, rand);
    }
    function setB(uint _betMoney, string memory _whatRsp) public {
        require(balanceOf[addrB] >= _betMoney);
        uint numRsp;
        if (keccak256(bytes(_whatRsp)) == keccak256(bytes("Rock"))) numRsp = 0;
        else if (keccak256(bytes(_whatRsp)) == keccak256(bytes("Scissors"))) numRsp = 1;
        else numRsp = 2;
        b = Member("B", _betMoney, numRsp);
    }
    function play() public {
        if (a.whatRsp == b.whatRsp) {
            result = 2;
        }
        else if ((a.whatRsp == 0 && b.whatRsp == 1) || (a.whatRsp == 1 && b.whatRsp == 2) || (a.whatRsp == 2 && b.whatRsp == 0)) {
            result = 0;
        }
        else {
            result = 1;
        }
    }
    function distributeBetAmount() public onlyOwner{
        if (result == 0) {
            balanceOf[addrB] -= b.betMoney;
            balanceOf[addrA] += b.betMoney;
        }
        else if (result == 1) {
            balanceOf[addrA] -= a.betMoney;
            balanceOf[addrB] += a.betMoney;
        }
    }
    function getMatchResult() public view returns(string memory) {
        return matchResult[result];
    }
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
}
