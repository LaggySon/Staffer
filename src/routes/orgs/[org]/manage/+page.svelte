<script lang="ts">
	import Check from '$lib/check.svelte';
	import Delete from '$lib/delete.svelte';
	import type { Social } from '@prisma/client';
	import { each } from 'svelte/internal';

	export let data;

	let socials: any = data?.org?.socials;
	console.log(socials);

	let showDelete = false;
	let showCreateSocial = false;

	let name = data?.org?.name;
</script>

<div class="flex flex-wrap justify-center items-center mb-10 gap-4">
	<a href={`/orgs/${data?.org?.id}`} class="flex justify-center"
		><img src={data?.org?.logo} alt="" class="h-[4em]" /></a
	>

	<h1 class=" text-xl ">Managing {name === '' ? 'a new organization' : name}</h1>
</div>

<form action="?/update" method="post" class=" flex flex-col  gap-4 justify-center items-center ">
	<input type="hidden" name="socials" value={socials} />
	<input type="hidden" name="orgId" value={data?.org?.id} />
	<div class="flex flex-col w-full max-w-xl">
		<label for="name" class=" text-sm">Organization Name:</label>
		<input
			value={data?.org?.name}
			type="text"
			name="name"
			class=" bg-transparent border-b outline-none "
			required
		/>
	</div>
	<div class="flex flex-col w-full max-w-xl">
		<label for="description" class=" text-sm">Organization Description:</label>
		<textarea name="description" class=" bg-transparent border outline-none " required
			>{data?.org?.description}</textarea
		>
	</div>
	<div class="flex flex-col w-full max-w-xl">
		<label for="logo" class=" text-sm">Organization Logo URL:</label>
		<input
			type="text"
			name="logo"
			value={data?.org?.logo}
			class=" bg-transparent border-b outline-none "
			required
		/>
	</div>
	<div class="flex flex-col w-full max-w-xl">
		<label for="contactInfo" class=" text-sm">Organization Contact Info:</label>
		<input
			type="text"
			name="contactInfo"
			value={data?.org?.contactInfo}
			class=" bg-transparent border-b outline-none "
			required
		/>
	</div>
	<button formaction="?/update" class="hover:rounded-lg transition-all mb-8 bg-blue-400 px-4"
		>Save Changes</button
	>
</form>
<div class=" flex flex-col gap-4 justify-center items-center ">
	<p class="">Socials</p>
	<div class="flex flex-col items-center">
		{#each socials as social, i}
			<form method="POST" class="flex-wrap flex gap-2 m-4 justify-center">
				<input type="hidden" name="socialId" value={social.id} />
				<p class="flex flex-col">
					<span class="text-sm">Website:</span>
					<input
						required
						type="text"
						bind:value={socials[i].site}
						name="site"
						class=" bg-transparent border-b outline-none "
						placeholder="Website"
					/>
				</p>
				<p class="flex flex-col">
					<span class="text-sm">Handle:</span>
					<input
						required
						type="text"
						bind:value={socials[i].handle}
						name="handle"
						class=" bg-transparent border-b outline-none "
						placeholder="Handle"
					/>
				</p>
				<div class="flex justify-center items-center w-full md:w-auto">
					<button
						class="hover:rounded-lg transition-all mx-4  hover:border-transparent hover:bg-red-400 p-1"
						formaction="?/deleteSocial"><Delete /></button
					>
				</div>
				<input type="hidden" name="socialId" value={social.id} />
			</form>
		{/each}
		<form method="post">
			<input type="hidden" name="orgId" value={data?.org?.id} />
			{#if showCreateSocial}
				<div class="flex gap-2 flex-wrap justify-center">
					<p class="flex flex-col">
						<span class="text-sm">Website:</span>
						<input
							required
							type="text"
							name="site"
							class=" bg-transparent border-b outline-none "
							placeholder="Website"
						/>
					</p>
					<p class="flex flex-col">
						<span class="text-sm">Handle:</span>
						<input
							required
							type="text"
							name="handle"
							class=" bg-transparent border-b outline-none "
							placeholder="Handle"
						/>
					</p>
				</div>
			{:else}
				<button
					on:click={() => (showCreateSocial = true)}
					class="hover:rounded-lg transition-all m-4 border hover:border-transparent hover:bg-blue-400 px-4"
				>
					Create Social
				</button>
			{/if}
		</form>
	</div>

	<a
		class="hover:rounded-lg transition-all m-8 border hover:border-transparent hover:bg-red-400 px-4"
		href={`/orgs/${data?.org?.id}`}>Back</a
	>
	<form method="post">
		<input type="hidden" name="orgId" value={data?.org?.id} />
		{#if showDelete}
			<button
				class="inline bg-red-400 mt-10 p-2 text-sm hover:rounded-lg transition-all"
				formaction="?/deleteOrg">DELETE ORGANIZATION - ARE YOU SURE?</button
			>
		{:else}
			<button
				class="inline bg-red-400 mt-10 p-2 text-sm hover:rounded-lg transition-all"
				on:click|preventDefault={() => (showDelete = true)}
			>
				Delete Org
			</button>
		{/if}
	</form>
</div>
