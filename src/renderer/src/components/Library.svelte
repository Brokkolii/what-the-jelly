<script lang="ts">
    import { authStore, logout } from '../stores/auth'
</script>

<h1>Library</h1>
<p>{$authStore.User.Name}</p>
<p>{$authStore.AccessToken}</p>
<button onclick={() => logout()}>logout</button>
