<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';

	let joinCode: string;

	export let data;
	const orgs = data.orgsList;
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
				class="bg-blue-400 p-2  w-32 hover:rounded-lg transition-all">Sign In</button
			>
		</li>
	{:else}
		<p>Go to...</p>
		<ul>
			{#each orgs as org}
				<li class="bg-blue-400 p-2 m-2 max-w-lg mx-auto hover:rounded-lg transition-all">
					<a href={`/orgs/${org?.name}`} class="flex items-center justify-center gap-2"
						><img src={org?.logo} alt="" class="h-[2em]" /><span>{org?.name}</span></a
					>
				</li>
			{/each}
			<form action="?/join" method="POST">
				<input
					class="bg-transparent border"
					type="text"
					name="orgCode"
					id="orgcode"
					bind:value={joinCode}
				/>
				<input type="hidden" name="userEmail" value={$page?.data?.session?.user?.email} />
				<input class="bg-transparent border p-2 m-2" type="submit" value="Join" />
			</form>
			<li class="m-4">
				<button
					on:click|preventDefault={() => signOut()}
					class="bg-red-400 p-2 text-center w-32 hover:rounded-lg transition-all">Sign Out</button
				>
			</li>
		</ul>
	{/if}
</ul>
