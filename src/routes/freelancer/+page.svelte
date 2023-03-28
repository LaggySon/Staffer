<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';

	let orgs = ['Organization 1', 'Organization 2', 'Organization b'];
	let session = false;
	let joinCode = '';

	function login() {
		session = !session;
	}

	function joinOrg() {
		orgs = [...orgs, joinCode];
		joinCode = '';
	}
</script>

{#if $page?.data?.session?.user?.image}
	<img src={$page?.data?.session?.user?.image} alt="" height="100" width="100" class="mx-auto" />
{/if}
<h1 class="text-center text-3xl">Welcome, {$page?.data?.session?.user?.name ?? 'Freelancer'}!</h1>
<ul class="text-center">
	{#if !$page.data.session}
		<li class="m-4">
			<button
				on:click|preventDefault={() => {
					signIn('discord');
				}}
				class="bg-blue-400 p-2">Sign In</button
			>
		</li>
	{:else}
		<p>Go to...</p>
		<ul>
			{#each orgs as org}
				<li class="bg-blue-400 p-2 m-2 max-w-lg mx-auto"><a href="/events">{org}</a></li>
			{/each}
			<input
				class="bg-transparent border"
				type="text"
				name="orgcode"
				id="orgcode"
				bind:value={joinCode}
			/>

			<button class="bg-transparent border p-2 m-2" on:click|preventDefault={joinOrg}>Join</button>
			<li class="m-4">
				<button on:click|preventDefault={() => signOut()} class="bg-red-400 p-2">Sign Out</button>
			</li>
		</ul>
	{/if}
</ul>
