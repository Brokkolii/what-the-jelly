<script lang="ts">
    import Library from './components/Library.svelte'
    import Onboarding from './components/Onboarding.svelte'
    import { isLoggedIn } from './stores/auth'
</script>

{#if $isLoggedIn}
    <Library />
{:else}
    <Onboarding />
{/if}
