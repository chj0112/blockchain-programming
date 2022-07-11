//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

contract Bank {
    address owner;
    uint balance;
    
    event PrintLog(address from, uint amount);
    constructor() {
        owner = msg.sender;
        balance = 0;
    }
    receive() external payable {
        
    }
    fallback() external payable {
        balance += msg.value;
        emit PrintLog(msg.sender, msg.value);
    }
    function deposit(uint amount) public payable {
        require(msg.value == amount);
        balance += amount;
    }
    function withdrawAll() public onlyOwner minBalance {
        balance -= address(this).balance;
        payable(msg.sender).transfer(address(this).balance); 
    }
    function getBalance() public view returns(uint, uint) {
        return (address(this).balance, balance);
    }
    function forwardTo(address payable _receiver) public payable onlyOwner {
        _receiver.transfer(msg.value);
    }
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    modifier minBalance {
        require(address(this).balance>101 wei);
        _;
    }
}
