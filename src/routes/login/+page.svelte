<script lang="ts">
    import { enhance } from '$app/forms';
    import type { PageData } from './$types';
    
    export let data: PageData;
    export let form; 
</script>

<form method="post" action="?/login" use:enhance>
    
    <label for="name"> Username </label>
    <input type="text" name = "username">
    <label for="password"> password </label>
    <input type="text" name = "password">
    <button> login</button>
    {#if form?.username}
    <span style="color: red"> {form.username} </span>
    {/if}
    {#if form?.password}
    <span style="color: red"> {form.password} </span>
    {/if}
    

</form>
