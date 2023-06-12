<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';

	let showCreateBox = false;

	export let data;
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
<div class="flex flex-wrap justify-center items-center gap-2">
	{#if $page?.data?.session?.user?.role === 'admin'}
		{#each data.users as user}
			<form method="POST" action="?/changeRole" class="border text-center p-2">
				<p class="font-bold">{user.name}#{user.id}</p>
				<p>({user.email})</p>
				<input
					class="bg-transparent text-center border focus:rounded-lg outline-none transition-all"
					type="text"
					name="role"
					value={user.role}
				/>
				<input type="hidden" name="userId" value={user.id} />
			</form>
		{/each}
	{/if}
</div>
{#if $page.data.session}
	<form method="post" class="my-10 flex">
		<input type="hidden" name="userEmail" value={$page?.data?.session?.user?.email} />
		<button
			class="mx-auto text-3xl bg-gray-300 dark:bg-gray-800 p-2  cursor-pointer hover:bg-blue-400 hover:rounded-lg transition-all"
			formaction="?/createOrg">Create an Organization</button
		>
	</form>
{/if}
