<script>
	import Todos from './Todos.svelte'

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

</script>

<Todos {todos} on:addTodo={addTodoSC} on:markCompleted={markCompletedSC} on:markCompletedAll={markCompletedAllSC}/>
