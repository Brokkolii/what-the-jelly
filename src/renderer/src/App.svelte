<script lang="ts">
    import Library from './components/Library.svelte'
    import Onboarding from './components/Onboarding.svelte'
    import { checkConnectionToServer } from './stores/server'
    import { getUser, userStore } from './stores/auth'
    import type { JellyfinUser } from '../../shared/types/jellyfin'

    const initialising: Promise<JellyfinUser | null> = initializeServerAndUser()

    async function initializeServerAndUser(): Promise<JellyfinUser | null> {
        const connection = await checkConnectionToServer()
        if (connection) {
            return await getUser()
        } else {
            return null
        }
    }
</script>

{#await initialising}
    loading
{:then}
    {#if $userStore}
        <Library />
    {:else}
        <Onboarding />
    {/if}
{:catch err}
    {err}
{/await}
