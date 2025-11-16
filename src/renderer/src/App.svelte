<script lang="ts">
    import { onMount } from 'svelte'
    import Library from './components/Library.svelte'
    import Onboarding from './components/Onboarding.svelte'
    import { userStore } from './stores/auth'
    import { checkConnectionToServer } from './stores/server'
    import { getUser } from './stores/auth'

    onMount(async () => {
        const connection = await checkConnectionToServer()
        if (connection) {
            await getUser()
        }
    })
</script>

{#if $userStore}
    <Library />
{:else}
    <Onboarding />
{/if}
