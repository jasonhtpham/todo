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

	export let todos = [
        {
            id: 1,
            title: 'My first todo',
            completed: false
        },
        {
            id: 2,
            title: 'My second todo',
            completed: false
        },
        {
            id: 3,
            title: 'My third todo',
            completed: false
        },
	];
	
	function addTodoSC(event) {
		console.log(event.detail.text);
	}

	function markCompletedSC(event) {
		console.log(event.detail.text);
	}

	function markCompletedAllSC(event) {
		console.log(event.detail.text);
	}

  function startApp() {
    todoSC = new web3.eth.Contract(todoABI,scAddress);
  }

  window.addEventListener('load', async function() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    // console.log(web3);
    web3 = new Web3(window.web3.currentProvider);

    //Get current user's address
    var accounts = await web3.eth.getAccounts();
    callerAddress = accounts[0];

    var accountInterval = setInterval(async function() {
      let accounts = await web3.eth.getAccounts();
      if (accounts[0] !== callerAddress) {
        callerAddress = accounts[0];
      }
    }, 100);
    console.log(callerAddress);

    } else {
      // console.log("Error! There is no provider to use!!!");
      return noWeb3 = true;
    }

    // Now you can start your app & access web3js freely:
    try {
    startApp()

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
