pragma solidity ^0.4.0;
contract Counter {
    uint256 counter = 0;
    uint256 setTime;
    function add() public {
        counter++;
    }
    function subtract() public {
        counter--;
    }
    function getCount() public view returns (uint256) {
        return counter;
    }
    function setTimeCalled() public {
        setTime = block.timestamp;
    }
    function getTimeCalled() view public returns(uint256) {
        return setTime;
    }
}
