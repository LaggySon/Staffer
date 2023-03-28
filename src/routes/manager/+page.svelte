<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';

	export let data;
</script>

<h1 class="text-center">Manager Portal</h1>
{#if $page.data.session}
	<p class="text-center text-3xl">Hello {$page.data.session.user?.name ?? 'User'}</p>
	<button on:click={() => signOut()}>Sign Out</button>
{:else}
	<button on:click={() => signIn('discord')}>Sign In</button>
{/if}
<div class="flex justify-center items-center gap-2">
	{#each data.users as user}
		<div class="border text-center p-2">
			<p class="font-bold">{user.name}#{user.id}</p>
			<p>({user.email})</p>
		</div>
	{/each}
</div>
