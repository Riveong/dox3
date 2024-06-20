<script>
  import { onMount } from 'svelte';

  let stories = [];
  let loading = true;
  let title = '';
  let content = '';

onMount(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/stories');
    if (response.ok) {
      const data = await response.json();
      stories = data.stories;
    } else {
      console.error('Failed to fetch stories:', response.status);
    }
  } catch (error) {
    console.error('Error fetching stories:', error);
  } finally {
    loading = false;
  }
});

async function addStory() {
    try {
      const response = await fetch('http://localhost:3000/api/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content })
      });
      if (response.ok) {
        const newStory = await response.json();
        stories = [...stories, { id: newStory.id, title, content }];
        title = '';
        content = '';
      } else {
        console.error('Failed to add story:', response.status);
      }
    } catch (error) {
      console.error('Error adding story:', error);
    }
  }

async function deleteStory(id) {
    try {
      const response = await fetch(`http://localhost:3000/api/stories/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        // Remove the story from the local state
        stories = stories.filter(story => story.id !== id);
      } else {
        console.error('Failed to delete story:', response.status);
      }
    } catch (error) {
      console.error('Error deleting story:', error);
    }
  }

</script>

<input type="text" class="field" placeholder="Title" bind:value={title}>
<input type="text" class="field" placeholder="Content" bind:value={content}>
<button on:click={addStory}>+ Sticky</button>

<main>
  {#if loading}
    <p>Loading stories...</p>
  {:else if stories.length === 0}
    <p>No sticky note available! 🥲</p>
  {:else}
    <ul>
      {#each stories as story}
        <li>
          <button class="delete-button" on:click={() => deleteStory(story.id)}>✔</button>
          <div class="content">
            <h2>{story.title}</h2>
            <p>{story.content}</p>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</main>


<style>
ul {
    list-style-type: none;
    margin: 0;
    margin-top: 20px;
    padding: 0;
    display: flex;
    flex-wrap: wrap; /* Allows items to wrap onto the next line */
  }
  li {
    position: relative;
    margin: 10px;
    padding: 15px;
    background-color: #EDD9A3;
    flex: 1 1 calc(33.333% - 20px); /* Adjust width and spacing */
    box-sizing: border-box;
  }
  .content {
    margin-right: 2rem; /* Add some space for the delete button */
  }
    button{
        background-color:#CEA07E;
        color: white;
        font-size: 20px;
        padding: 6px 15px;
        border-radius: 10px;
        border: 2px solid black;
        margin-top: 10px;
    }
    
    .field {
      width: 100%;
      background-color: transparent;
      padding: 12px 20px;
      margin: 8px 0;
      box-sizing: border-box;
      border: none;
      border-bottom: 2px solid black;
    }

    h2{
      color: black;
      margin: 0;
      padding: 0;
    }
    p{
      margin: 0;
      padding: 0;
      color: black;
    }
    .delete-button {
      position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background-color: #CEA07E;
    color: white;
    border: 2px solid black;
    padding: 5px 7px;
    cursor: pointer;
    font-size: 10px;
    border-radius: 100%;
  }
</style>