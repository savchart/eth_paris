//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract YourContract {
	// State Variables
	address public immutable owner;
	uint256 public totalCounter = 0;
	mapping(address => uint) public deposits;

	// Constructor: Called once on contract deployment
	constructor(address _owner) {
		owner = _owner;
	}

	// Modifier: used to define a set of rules that must be met before or after a function is executed
	modifier isOwner() {
		require(msg.sender == owner, "Not the Owner");
		_;
	}

	/**
	 * Function that allows the owner to withdraw all the Ether in the contract
	 */
	function withdrawFunds() public isOwner {
		(bool success, ) = owner.call{ value: address(this).balance }("");
		require(success, "Failed to send Ether");
	}

    /**
     * Function that allows an account to deposit ETH into the contract
     */
    function deposit() public payable {
        require(msg.value > 0, "You must send some Ether");
        deposits[msg.sender] += msg.value;
    }

    /**
     * Function that allows anyone to check the contract's balance
     */
    function checkBalance() public view returns (uint) {
        return address(this).balance;
    }

    /**
     * Function that allows anyone to check how much they have deposited
     */
    function checkDeposits() public view returns (uint) {
        return deposits[msg.sender];
    }

    /**
     * Function that allows a user to withdraw their deposits
     */
    function withdrawDeposits(uint _amount) public {
        require(deposits[msg.sender] >= _amount, "Not enough deposited");
        deposits[msg.sender] -= _amount;
        (bool success, ) = msg.sender.call{ value: _amount }("");
        require(success, "Failed to send Ether");
    }
}
