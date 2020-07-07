pragma solidity >=0.4.0;
pragma experimental ABIEncoderV2;

contract TodoList {
 
    struct Todo {
        uint id;
        string task;
        bool completed;
    }
    
    Todo[] itemsList;
    
    mapping (uint => address) private ownerById;
    
    uint private itemCount = 0;
    
    function addItem (string memory _task, bool _completed) public {
        itemCount++;
        
        itemsList.push(Todo(itemCount, _task, _completed));
        
        ownerById[itemCount] = msg.sender;
        
    }
    
    //Ensure only the owner can call some functions
    modifier onlyOwner(uint _id) {
		require(ownerById[_id] == msg.sender, "Invalid action!!!");
		_;
	}
	
	//Check if the provided item exists
	modifier itemExist(uint _id) {
	    require(_id <= itemCount, "Invalid action!!!");
	    _;
	}
    
    function markCompleted(uint _id) public onlyOwner(_id) itemExist(_id) {
        //The id starts at 1 but array indexes start at 0
        itemsList[(_id-1)].completed = true;
    }
    
    function getAllTodos() public view returns(Todo[] memory) {
        return itemsList;
    }
}