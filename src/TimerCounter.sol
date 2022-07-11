pragma solidity ^0.4.0;
contract Timer {
    uint256 startTime;
    uint256 counter = 0;
    function start() public {
        //startTime=now; now is deprecated as of v0.7
        startTime=block.timestamp;
    }
    function timePassed() public view returns(uint256) {
        //return now-startTime;
        return block.timestamp-startTime;
    }
    function getNow() view public returns(uint) {
        //return now;
        return block.timestamp;
    }
    function add() public {
        counter++;
    }
    function subtract() public {
        counter--;
    }
    function getCounter() public view returns (uint256) {
        return counter;
    }
}
