<script>
  import Todos from './Todos.svelte'
  import Web3 from 'web3';
  import todoABI from './todoABI.js';

  var web3 = window.web3;

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

  //   function startApp() {
  //       // etherGram = new web3.eth.Contract(ethergramABI,scAddress);
  //   }

  // window.addEventListener('load', async function() {
  //   // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  //   if (typeof web3 !== 'undefined') {
  //   // Use Mist/MetaMask's provider
  //   console.log("Use MetaMask as provider");
  //   web3 = new Web3(window.web3.currentProvider);
  //   } else {
  //     console.log("Error! There is no provider to use!!!");
  //   }

  //   // Now you can start your app & access web3js freely:
  //   startApp()

  //   var accounts = await web3.eth.getAccounts();
  //   callerAddress = accounts[0];

  //   var accountInterval = setInterval(async function() {
  //     let accounts = await web3.eth.getAccounts();
  //     if (accounts[0] !== callerAddress) {
  //       callerAddress = accounts[0];
  //     }
  //   }, 100);

  // })

</script>

<Todos {todos} on:addTodo={addTodoSC} on:markCompleted={markCompletedSC} on:markCompletedAll={markCompletedAllSC}/>
