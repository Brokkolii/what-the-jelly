<script lang="ts">
    import { userStore, logout } from '../stores/auth'
</script>

<h1>Library</h1>
<p>{$userStore.Name}</p>
<button onclick={() => logout()}>logout</button>
