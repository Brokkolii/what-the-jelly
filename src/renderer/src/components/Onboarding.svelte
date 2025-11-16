<script lang="ts">
    import { hasConnectionToServerStore } from '../stores/server'
    import LoginForm from './LoginForm.svelte'
    import ServerForm from './ServerForm.svelte'
</script>

{#if $hasConnectionToServerStore}
    <LoginForm />
{:else}
    <ServerForm />
{/if}
