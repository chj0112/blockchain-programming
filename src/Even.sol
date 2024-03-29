pragma solidity ^0.4.0;
contract Counter {
    uint256 counter = 0;
    function add() public {
        counter++;
    }
    function subtract() public {
        counter--;
    }
    function getCounter() public view returns (uint256) {
        return counter;
    }
    function isEven() public view returns (string memory) {
        if (counter % 2 == 0) return "Even";
        else return "Odd";
    }
}
