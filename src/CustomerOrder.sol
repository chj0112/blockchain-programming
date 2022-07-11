//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

contract Customer {
    struct CustomerDetails {
        uint id;
        string name;
        string ph;
        string home;
        bool isCus;
    }
    mapping(address=>CustomerDetails) customerMap;
    mapping(address=>uint) mileage;
    function addMileage(uint amount) public {
        mileage[tx.origin] += amount / 100;
    }
    function subMileage(uint amount) public {
        mileage[tx.origin] -= amount / 100;
    }
    function getMileage() public view returns(uint) {
        return mileage[tx.origin];
    }
    function addCustomer(uint _id, string memory _name, string memory _ph, string memory _home) public {
        //require(id == 0);
        CustomerDetails memory c = CustomerDetails(_id, _name, _ph, _home, true);
        customerMap[tx.origin] = c;
        mileage[tx.origin] = 0;
    }
    function getHomeAddress() public view returns(string memory) {
        CustomerDetails memory c = customerMap[tx.origin];
        return c.home;
    }
    function getId() public view returns(uint) {
        CustomerDetails memory c = customerMap[tx.origin];
        return c.id;
    }
    function isCustomer() public view returns(bool) {
        CustomerDetails memory c = customerMap[tx.origin];
        return c.isCus;
    }
}

contract Order {
    struct OrderDetails {
        uint orderId;
        string p;
        uint n;
        uint256 time;
        string shippingAddr;
        bool isOrdered;
    }
    uint orderNumber;
    uint totalAmount;
    mapping(address=>OrderDetails) orderMap;
    mapping(address=>string) s;
    mapping(address=>uint) amount;
    mapping(address=>uint) balanceOf;
    mapping(uint=>address) addressById;
    Customer c;
    constructor() {
        c = new Customer();
    }
    function placeOrder(uint _id, string memory _p, uint _n, uint _amount) payable public {
        require(_amount != 0);
        require(msg.value == _amount);
        OrderDetails memory o = OrderDetails(_id, _p, _n, block.timestamp, c.getHomeAddress(), true);
        orderMap[tx.origin] = o;
        s[tx.origin] = "Ordered";
        amount[tx.origin] = _amount;
        addressById[_id] = tx.origin;
        c.addMileage(_amount);
        balanceOf[tx.origin] += _amount;
        orderNumber++;
        totalAmount += _amount;
    }
    function refund(uint _id) public {
        require(balanceOf[addressById[_id]] >= amount[addressById[_id]] && address(this).balance >= amount[addressById[_id]]);
        address payable receiver = payable(addressById[_id]);
        s[addressById[_id]] = "refunded";
        c.subMileage(amount[addressById[_id]]);
        balanceOf[receiver] -= amount[addressById[_id]];
        receiver.transfer(amount[addressById[_id]]);
        orderNumber--;
        totalAmount -= amount[addressById[_id]];
        amount[addressById[_id]] = 0;
    }
    function addCustomer(uint _id, string memory _name, string memory _ph, string memory _home) public {
        c.addCustomer(_id, _name, _ph, _home);
    }
    function getHomeAddress() public view returns(string memory) {
        return c.getHomeAddress();
    }
    function getStatus() public view returns(string memory) {
        return s[tx.origin];
    }
    function updateStatus(uint _id, string memory _s) public {
        s[addressById[_id]] = _s;
    }
    function getOrderItem() public view returns(uint, string memory, string memory, string memory) {
        OrderDetails memory o = orderMap[tx.origin];
        return (o.orderId, o.p, s[tx.origin], o.shippingAddr);
    }
    function getOrderById(uint _id) public view returns(uint, string memory, string memory, string memory) {
        OrderDetails memory o = orderMap[addressById[_id]];
        return (o.orderId, o.p, s[addressById[_id]], o.shippingAddr);
    }
    function getNOrder() public view returns(uint) {
        return orderNumber;
    }
    function getTotalOrderAmount() public view returns(uint) {
        return totalAmount;
    }
    function queryBalance() public view returns(uint) {
        return address(this).balance;
    }
}
