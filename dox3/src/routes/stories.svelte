<script>
  import { onMount } from 'svelte';
  let todos = [];
  let newTodo = '';

  async function loadTodos() {
    const res = await fetch('http://localhost:3000/api/stories');
    todos = await res.json();
  }

  async function addTodo() {
    if (newTodo.trim() !== '') {
      const res = await fetch('http://localhost:3000/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newTodo, completed: false })
      });
      const todo = await res.json();
      todos = [...todos, todo];
      newTodo = '';
    }
  }

  async function deleteTodo(id) {
    await fetch(`http://localhost:3000/api/stories/${id}`, {
      method: 'DELETE'
    });
    todos = todos.filter(todo => todo.id !== id);
  }

  onMount(loadTodos);
</script>

<div>
  <input type="text" bind:value={newTodo}>
  <button on:click={addTodo}>Add Todo</button>
  <ul>
    {#each todos as todo}
      <li>
        <input type="checkbox" bind:checked={todo.completed}>
        {todo.text}
        <button on:click={() => deleteTodo(todo.id)}>Delete</button>
      </li>
    {/each}
  </ul>
</div>
