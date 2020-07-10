var todoABI =
    [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_task",
                    "type": "string"
                },
                {
                    "internalType": "bool",
                    "name": "_completed",
                    "type": "bool"
                }
            ],
            "name": "addItem",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "markCompleted",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getAllTodos",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "task",
                            "type": "string"
                        },
                        {
                            "internalType": "bool",
                            "name": "completed",
                            "type": "bool"
                        }
                    ],
                    "internalType": "struct TodoList.Todo[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]

module.exports = todoABI;