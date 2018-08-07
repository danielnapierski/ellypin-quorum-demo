pragma solidity ^0.4.24;

contract simplestorage {
  uint public storedData;
  address public owner;

  constructor(uint initVal) public {
    owner = msg.sender;
    storedData = initVal;
  }

//  function simplestorage(uint initVal) {
//    storedData = initVal;
//  }

  function set(uint x) public {
    storedData = x;
  }

  function get() public constant returns (uint retVal) {
    return storedData;
  }
}
