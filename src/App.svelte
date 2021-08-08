<script>
  import Todos from './Todos.svelte';
  import Error from './Error.svelte';  
  import Web3 from 'web3';
  import todoABI from './todoABI.js';

  var web3 = window.web3;

  //a variable to check if there is a web3 provider on user's browser
  let noWeb3 = false;

  let scAddress = "0x9f70f73ffe8c9a8d5635b01181efea83857daed9";
  let todoSC;
  let callerAddress;

	export let todos = [];
	
	async function addTodoSC(event) {
    await todoSC.methods.addItem(event.detail.title, event.detail.completed).send({from:callerAddress});
    
    getTodosFromSC();
	}

	async function markCompletedSC(event) {
    // console.log(event.detail.id);
    await todoSC.methods.markCompleted(event.detail.id).send({from:callerAddress});
	}

	function markCompletedAllSC(event) {
		console.log(event.detail.text);
  }
  
  async function getTodosFromSC() {
    const results = await todoSC.methods.getAllTodos().call({from:callerAddress});
    // Check if there are any elements already in todos[]
    // "todos.length == 0" is when the web is started -> get all todos from SC
    // "todos.length != 0" is when there are todos loaded from SC
    // -> Update todos with the latest added todo.
    if (todos.length == 0) {
      results.forEach(result => {
      todos = [...todos, {
                id: result.id,
                completed: result.completed,
                title: result.task
            }];
      });
    } else {
      todos = [...todos, {
                id: results[results.length-1].id,
                completed: results[results.length-1].completed,
                title: results[results.length-1].task
            }];
    }
  }

  function startApp() {
    todoSC = new web3.eth.Contract(todoABI,scAddress);
    getTodosFromSC();
  }

  window.addEventListener('load', async function() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3 = new Web3(window.web3.currentProvider);
    window.ethereum.enable();
    // console.log(web3);
    } else {
      // console.log("Error! There is no provider to use!!!");
      return noWeb3 = true;
    }

    // Now you can start your app & access web3js freely:
    try {
    startApp()

    //Get current user's address
    var accounts = await web3.eth.getAccounts();
    callerAddress = accounts[0];

    var accountInterval = setInterval(async function() {
      let accounts = await web3.eth.getAccounts();
      if (accounts[0] !== callerAddress) {
        callerAddress = accounts[0];
      }
    }, 100);

    } catch (e) {
      console.log(e);
    }
  })

</script>

{#if noWeb3}
  <Error />
  {:else}
    <Todos {todos} on:addTodo={addTodoSC} on:markCompleted={markCompletedSC} on:markCompletedAll={markCompletedAllSC}/>
{/if}
