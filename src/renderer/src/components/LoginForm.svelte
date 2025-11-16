<script lang="ts">
    import type { JellyfinAuthResponse } from '../../../shared/types/jellyfin'
    import { login } from '../stores/auth'

    let username = ''
    let password = ''
    let auth: Promise<JellyfinAuthResponse> | null = null

    async function handleSubmit(): Promise<void> {
        // TODO catch error and handle loading
        auth = login(username, password)
    }
</script>

{#if !auth}
    <form onsubmit={handleSubmit}>
        <input type="text" bind:value={username} />
        <input type="password" bind:value={password} />
        <button type="submit">Login</button>
    </form>
{:else}
    {#await auth}
        loading
    {:then auth}
        logged in as {auth.User.Name}
    {:catch err}
        {err}
        <button onclick={() => (auth = null)}>retry</button>
    {/await}
{/if}

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
