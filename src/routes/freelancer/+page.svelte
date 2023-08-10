<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';

	let joinCode: string;

	export let data;
	const orgs = data.orgsList;
	const allOrgs = data?.filteredOrgs ?? [];
</script>

{#if $page?.data?.session?.user?.image}
	<a href={`/users/${data?.userId}`}>
		<img src={$page?.data?.session?.user?.image} alt="" height="100" width="100" class="mx-auto" />
	</a>
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
		<ul class="flex flex-wrap justify-center items-center">
			{#each orgs as org}
				<li
					class="text-gray-700 hover:text-white hover:bg-blue-400 bg-gray-300 p-2 m-2 hover:rounded-lg transition-all"
					title={org.name}
				>
					<a href={`/orgs/${org?.id}`} class="flex flex-col items-center justify-center gap-2"
						><img src={org?.logo === '' ? '/org.png' : org?.logo} alt="" class="h-32 w-32" /></a
					>
				</li>
			{/each}
		</ul>
		<form action="?/join" method="POST">
			<input
				class="bg-gray-300 dark:bg-gray-800 outline-none p-2"
				type="text"
				name="orgCode"
				id="orgcode"
				bind:value={joinCode}
			/>
			<input type="hidden" name="userEmail" value={$page?.data?.session?.user?.email} />
			<input class="bg-gray-300 dark:bg-gray-800 p-2" type="submit" value="Join" />
		</form>
		<li class="m-4">
			<button
				on:click|preventDefault={() => signOut()}
				class="bg-red-400 p-2 text-center w-32 hover:rounded-lg transition-all">Sign Out</button
			>
		</li>
		<h1 class="text-2xl mb-2">Browse other orgs</h1>
		<div class="flex flex-wrap gap-4 justify-center">
			{#each allOrgs as org}
				<form action="?/join" method="post">
					<input type="hidden" name="orgCode" value={org.id} />
					<input type="hidden" name="userEmail" value={$page?.data?.session?.user?.email} />
					<button type="submit">
						<img
							title={org?.name}
							src={org?.logo === '' ? '/org.png' : org?.logo}
							alt={org.name}
							class="text-gray-700 hover:text-white hover:bg-yellow-400 bg-gray-300 p-1  hover:rounded-lg transition-all h-24 w-24"
						/>
						<p class="line-clamp-2 w-24">{org.name}</p>
					</button>
				</form>
			{/each}
		</div>
	{/if}
</ul>
