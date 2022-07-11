//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

contract StudentCrud {
    struct Student {
        uint num;
        string name;
        bool isEnrolled;
    }
    Student[] s;
    Student temp;
    //memory only for string type
    //201711111,"kim",false
    function insert(uint n, string memory sn, bool e) public {
        temp.num = n;
        temp.name = sn;
        temp.isEnrolled = e;
        s.push(temp);
    }
    function getFirstStudent() public view returns(uint, string memory, bool){
        return (s[0].num, s[0].name, s[0].isEnrolled);
    }
    function findBy(uint8 index) view public returns(uint, string memory, bool) {
        return (s[index].num, s[index].name, s[index].isEnrolled);
    }
    function remove(uint index) public {
        require(index < s.length);
        s[index] = s[s.length - 1];
        s.pop();
    }
    function getLength() view public returns(uint) {
        return s.length;
    }
    function pop() public {
        s.pop();
    }
}
