<script lang="ts">
    let username = ''
    let password = ''

    async function handleSubmit(): Promise<void> {
        const result = await window.api.authenticateUserByName(username, password)
        console.log(result)
    }
</script>

<form on:submit|preventDefault={handleSubmit}>
    <input type="text" bind:value={username} />
    <input type="password" bind:value={password} />
    <button type="submit">Login</button>
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    button {
        cursor: pointer;
        text-decoration: none;
        display: inline-block;
        border: 1px solid transparent;
        text-align: center;
        font-weight: 600;
        white-space: nowrap;
        border-radius: 20px;
        padding: 0 20px;
        line-height: 38px;
        font-size: 14px;
        border-color: var(--ev-button-alt-border);
        color: var(--ev-button-alt-text);
        background-color: var(--ev-button-alt-bg);
    }

    button:hover {
        border-color: var(--ev-button-alt-hover-border);
        color: var(--ev-button-alt-hover-text);
        background-color: var(--ev-button-alt-hover-bg);
    }
</style>
