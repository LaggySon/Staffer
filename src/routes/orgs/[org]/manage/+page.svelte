<script lang="ts">
	import Check from '$lib/check.svelte';
	import Delete from '$lib/delete.svelte';
	import type { Social } from '@prisma/client';
	import { each } from 'svelte/internal';

	export let data;

	function getSocials(): any {
		let socials: any = data?.org?.socials;
		socials = socials.map((social: Social) => {
			return { website: social.site, handle: social.handle };
		});
		return socials;
	}

	function addSocial() {
		socials = [...socials, { website: '', handle: '' }];
	}

	function deleteSocial(social: any) {
		socials = socials.filter((s: any) => s !== social);
	}

	let socials = getSocials();

	console.log(getSocials());

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

	<div class=" flex flex-col gap-4 justify-center items-center ">
		<p class="">Socials</p>
		<div class="flex flex-col items-center">
			{#each socials as social, i}
				<div class="flex gap-2">
					<p class="flex flex-col">
						<span class="text-sm">Website:</span>
						<input
							required
							type="text"
							bind:value={socials[i].website}
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
					<button
						class="hover:rounded-lg transition-all mx-4  hover:border-transparent hover:bg-red-400 p-1"
						on:click={() => deleteSocial(social)}><Delete /></button
					>
				</div>
			{/each}
			<button
				on:click={() => addSocial()}
				class="hover:rounded-lg transition-all m-4 border hover:border-transparent hover:bg-blue-400 px-4"
				>Add Social</button
			>
		</div>
		<button formaction="?/update" class="hover:rounded-lg transition-all mb-8 bg-blue-400 px-4"
			>Save Changes</button
		>
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
</form>
