<script lang="ts">
    import Versions from './components/Versions.svelte'
    import electronLogo from './assets/electron.svg'
    import LoginForm from './components/LoginForm.svelte'
</script>

<img alt="logo" class="logo" src={electronLogo} />
<div class="creator">Powered by electron-vite</div>
<div class="text">
    Build an Electron app with
    <span class="svelte">Svelte</span>
    and
    <span class="ts">TypeScript</span>
</div>
<p class="tip">Please try pressing <code>F12</code> to open the devTool</p>

<LoginForm />

<Versions />
