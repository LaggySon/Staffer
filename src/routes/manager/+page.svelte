<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';

	let showCreateBox = false;

	export let data;
	const orgs = data.orgsList;
</script>

<p class="text-center text-3xl">Hello, {$page.data?.session?.user?.name ?? 'Manager'}!</p>
<!-- <p>{$page?.data.session.user?.role}</p> -->{#if $page.data.session}
	<button
		on:click|preventDefault={() => signOut()}
		class="bg-red-400 p-2 text-center mx-auto my-4 w-32 hover:rounded-lg transition-all"
		>Sign Out</button
	>
{:else}
	<button
		on:click|preventDefault={() => {
			signIn('discord');
		}}
		class="bg-blue-400 p-2  mx-auto my-4 w-32 hover:rounded-lg transition-all">Sign In</button
	>
{/if}
<p class="text-center">Orgs you manage</p>
<ul class="flex flex-wrap justify-center items-center">
	{#each orgs as org}
		<li
			class="text-gray-700 hover:text-white hover:bg-red-400 bg-gray-300 p-2 m-2  hover:rounded-lg transition-all"
			title={org.name}
		>
			<a href={`/orgs/${org?.id}`} class="flex flex-col items-center justify-center gap-2"
				><img
					src={org?.logo === '' ? '/android-chrome-512x512.png' : org?.logo}
					alt=""
					class="h-32 w-32"
				/></a
			>
		</li>
	{/each}
</ul>
<div class="flex flex-wrap justify-center items-center gap-2" />
{#if $page.data.session}
	{#if !showCreateBox}
		<button
			class="mx-auto text-3xl bg-gray-300 dark:bg-gray-800 p-2  cursor-pointer hover:bg-blue-400 hover:rounded-lg transition-all"
			on:click|preventDefault={() => (showCreateBox = true)}>Create an Organization</button
		>
	{:else}
		<form method="post" class=" flex flex-col gap-2 items-center border mx-auto p-2">
			<input type="hidden" name="userEmail" value={$page?.data?.session?.user?.email} />
			<label for="name">Organization Name</label>
			<input type="text" name="name" class=" bg-transparent border-b outline-none w-72" required />
			<label for="description">Organization Description</label>
			<textarea name="description" class=" bg-transparent border outline-none " required />
			<button
				class="mx-auto text-3xl bg-gray-300 dark:bg-gray-800 p-2  cursor-pointer hover:bg-blue-400 hover:rounded-lg transition-all"
				formaction="?/createOrg">Create</button
			>
		</form>
	{/if}
{/if}
