<script>
    import gif from "$lib/gif.gif";
import Stories from "./stories.svelte";

    let todos = [];
    let newTodo = '';
    let timeString = '';

    function handleAddTodo() {
        if (newTodo.trim() !== '') {
            todos = [...todos, { text: newTodo, completed: false }];
            newTodo = '';
        }
    }

    function handleDelete(index) {
        todos = todos.filter((_, i) => i !== index);
    }

    function updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        timeString = `${hours}:${minutes}:${seconds}`;
    }
    setInterval(updateTime, 1000);
</script>

<div class="container">
    <div class="left">
        <p>dox3 alpha 1</p>
        <h1 class="greeting">Good Evening,</h1>
    </div>
    <div class="right">
        <p style="text-align: right;">{timeString}</p>
    </div>
</div>

<div class="container2">
    <div class="content">
        <input type="text" id="fname" class="field" name="fname" bind:value={newTodo}> 
        <button on:click={handleAddTodo}>+</button>
        <br><p style="color:black; font-size:25px;">To do</p>
        {#each todos as todo, index} 
            <div class="list">
                <label style="font-size: 20px;"> 
                    <input type="checkbox" bind:checked={todo.completed} style="transform: scale(2);"> {todo.text}
                </label>
                <button class="delete" on:click={() => handleDelete(index)}>❌</button> 
                <br>   
            </div>
        {/each}
    </div>

    <div class="widget">
        <center>
            <img src={gif} width="50%" style="padding:25px;">
        </center>
        <Stories />
    </div>
</div>

<style>
    .container {
        padding: 20px 50px;
        display: flex;
    }
    .left {
        width: 50%;
    }
    .right {
        width: 50%;
    }
    .container2 {        
        border-radius: 30px 30px 0 0;
        padding: 50px 50px;
        background-color: #F0F2FF;
        padding: 20px 50px;
        display: flex;
        min-height: 65vh;
    }
    .content{
        width: 60%;
    }
    .widget{
        width: 40%;
    }
    .greeting{
        font-size: 60px;
    }
    .list{
        color: #000000;
        font-size: 20px;
        margin: 20px 10px;
        margin-right: 20px;
        font-family: "Roboto", sans-serif;
        font-weight: 400;
        font-style: normal;
        border-bottom: 2px solid black;
        padding-bottom: 10px;
    }
    .field{
        width: 70%;
        background-color: transparent;
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
        border: none;
        border-bottom: 2px solid black;
    }
    button{
        background-color:#4DAAFF;
        color: white;
        font-size: 20px;
        padding: 3px 9px;
        border-radius: 100%;
        border: 2px solid black;
    }
    .delete{
        background-color: transparent;
        border:none;
    }
</style>
