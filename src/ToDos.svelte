<script>
    import TodoItem from './TodoItem.svelte';

    let todos = [
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

    let newTodoTitle = '';
    let currentFilter = 'all';
    let nextId = 4;

    /* Things to think:
    - Can an item be deleted on blockchain?
    - Expiry feature
    */



    function addTodo(event) {
        //if Enter key is pressed -> addTodo
        if (event.key === 'Enter') {
            todos = [...todos, {
                id: nextId,
                completed: false,
                title: newTodoTitle
            }];

            nextId++;
            newTodoTitle = '';
        }
        resetCheckAll();
        //call contract's method to add task
    }


    $: todosRemaining = filteredTodos.filter(todo => !todo.completed).length;

    $: filteredTodos = currentFilter === 'all' ? todos : currentFilter === 'completed' 
        ? todos.filter(todo => todo.completed)
        : todos.filter(todo => !todo.completed)

    function resetCheckAll() {
        document.getElementById("checkAll").disabled = false;
        document.getElementById("checkAll").checked = false;
    }

    function checkAllTodos(event) {
        todos.forEach(todo => {
                todo.completed = event.target.checked
                document.getElementById(todo.id).disabled = true;
            });
        document.getElementById("checkAll").disabled = true;

        todos = todos;
        //call contract method to set as completed
    }

    function updateFilter(newFilter) {
        currentFilter = newFilter;
    }

    function clearCompleted() {
        todos = todos.filter(todo => !todo.completed);
        resetCheckAll();
    }

    function handleDeleteTodo(event) {
        todos = todos.filter(todo => todo.id !== event.detail.id);
    }

    function handleToggleComplete(event) {
        document.getElementById(event.detail.id).disabled = true;
        const todoIndex = todos.findIndex(todo => todo.id === event.detail.id);
        const updatedTodo = {...todos[todoIndex], completed : !todos[todoIndex].completed};
        todos = [
                ...todos.slice(0,todoIndex),
                updatedTodo,
                ...todos.slice(todoIndex + 1),
                ];
        //call contract method to set as completed
    }

</script>

<style>
    .container {
        max-width: 800px;
        margin: 10px auto;
    }
    .logo {
        display: block;
        margin: 20px auto;
        width: 50%;
    }
    .todo-input {
        width: 100%;
        padding: 10px, 20px;
        font-size: 18px;
        margin-bottom: 20px;
    }
    .inner-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        border-top: 1px solid lightgrey;
        padding-top: 15px;
        margin-bottom: 13px;
    }
    .inner-container-input {
        margin-right: 12px;
    }
    button {
        font-size: 14px;
        background-color: white;
        appearance: none;
    }
    button:hover {
        background: lightseagreen;
    }
    button:focus {
        outline: none;
    }
    .active {
        background: lightseagreen;
    }
</style>


<div class="container">
    <a href="https://www.linkedin.com/in/thien-jason-pham-a82352168/" target="_blank"><img src={'https://static.wixstatic.com/media/30a71d_3672d013009b4022999bdf7d855a0ce0~mv2.jpg/v1/fill/w_63,h_63,al_c,q_80,usm_0.66_1.00_0.01/Free_Sample_By_Wix_jfif.webp'} 
    alt="Jason logo" class="logo"></a>

    <h2> Todo App </h2>
    <input type="text" class="todo-input" placeholder="Insert todo item ..." bind:value={newTodoTitle} on:keydown={addTodo} />

    {#each filteredTodos as todo}
        <div class="todo-item">
            <TodoItem {...todo} on:deleteTodo={handleDeleteTodo} on:toggleComplete={handleToggleComplete} />
        </div>
    {/each}

    <div class="inner-container">
        <div>
            <label> <input class="inner-container-input" type="checkbox" id="checkAll" on:change={checkAllTodos} /> Check All </label>
        </div>

        <div>
            {todosRemaining} items left
        </div>
    </div>

    <div class="inner-container">
        <div>
            <button on:click={() => updateFilter('all')} class:active="{currentFilter === 'all'}"> All </button>
            <button on:click={() => updateFilter('active')} class:active="{currentFilter === 'active'}"> Active </button>
            <button on:click={() => updateFilter('completed')} class:active="{currentFilter === 'completed'}"> Completed </button>
        </div>

        <div>
            <button on:click={clearCompleted}> Clear Completed </button>
        </div>
    </div>
</div>