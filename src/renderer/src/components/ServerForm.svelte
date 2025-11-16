<script lang="ts">
    import { setBaseUrl } from '../stores/server'

    let baseUrl = ''
    let server: Promise<void> | null = null

    async function handleSubmit(): Promise<void> {
        // TODO catch error and handle loading
        server = setBaseUrl(baseUrl)
    }
</script>

{#if !server}
    <form onsubmit={handleSubmit}>
        <h1>Server</h1>
        <input type="text" bind:value={baseUrl} />
        <button type="submit">Set BaseUrl</button>
    </form>
{:else}
    {#await server}
        loading
    {:catch err}
        {err}
        <button onclick={() => (server = null)}>retry</button>
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
