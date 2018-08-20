pragma solidity ^0.4.24;

contract SimpleStorage {
  string public storedData;
  address public sender;

  constructor() public {
    sender = msg.sender;
    storedData = "";
  }

  function set(string x) public {
    sender = msg.sender;
    storedData = x;
  }

  function get() public constant returns (string retVal) {
    return storedData;
  }

  function sender() public constant returns (address retVal) {
    return sender;
  }
}
