pragma solidity ^0.4.24;

contract SimpleStorage {
  uint public storedData;
  address public sender;

  constructor(uint initVal) public {
    sender = msg.sender;
    storedData = initVal;
  }

  function set(uint x) public {
    sender = msg.sender;
    storedData = x;
  }

  function get() public constant returns (uint retVal) {
    return storedData;
  }

  function sender() public constant returns (address retVal) {
    return sender;
  }
}
