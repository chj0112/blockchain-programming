//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

contract OrderEvent {
    address owner;

    event OrderLog(address indexed _from, bytes2 _itemId, uint _quantity, uint _price, string _shipAddress);

    constructor() {
        owner = msg.sender;
    }
    function order(bytes2 _itemId, uint quantity, uint unitPrice, string memory shipAddress) public payable {
        uint256 orderAmount = quantity * unitPrice;
        require(msg.value == orderAmount);
        emit OrderLog(msg.sender, _itemId, quantity, unitPrice, shipAddress);
    }
    function getBalance() public view isOwner returns(uint) {
        return address(this).balance;
    }
    modifier isOwner {
        require(msg.sender == owner);
        _;
    }
}
