<script lang="ts">
	import Check from '$lib/check.svelte';
	import Delete from '$lib/delete.svelte';
	import type { Social } from '@prisma/client';
	import { each } from 'svelte/internal';

	export let data;
	const freelancers = data.freelancers;

	function getSocials(): any {
		let socials: any = data?.org?.socials;
		socials = socials.map((social: Social) => {
			return { id: social.id, website: social.site, handle: social.handle };
		});
		return socials;
	}

	function addSocial() {
		socials = [...socials, { id: 'new', website: '', handle: '' }];
	}

	function deleteSocial(social: any) {
		socials = socials.filter((s: any) => s !== social);
	}

	let socials = getSocials();
	$: jsonSocials = JSON.stringify(socials);

	let showDelete = false;
	let showCreateSocial = false;

	const prevSocialCount = socials.length;

	let name = data?.org?.name;
</script>

<div class="flex flex-wrap justify-center items-center mb-10 gap-4">
	<a href={`/orgs/${data?.org?.id}`} class="flex justify-center"
		><img src={data.org?.logo === '' ? '/org.png' : data.org?.logo} alt="" class="h-[4em]" /></a
	>

	<h1 class=" text-xl ">Managing {name === '' ? 'a new organization' : name}</h1>
</div>

<div class="flex justify-center flex-wrap gap-10">
	<form
		action="?/update"
		method="post"
		class=" flex flex-col grow  gap-4 justify-center items-center max-w-[95vw]"
	>
		<input type="hidden" name="orgId" value={data?.org?.id} />
		<div class="flex flex-col w-full max-w-xl">
			<label for="name" class=" text-sm">Organization Name:</label>
			<input
				value={data?.org?.name}
				type="text"
				name="name"
				class=" bg-transparent border-b border-gray-600 outline-none "
				required
			/>
		</div>
		<div class="flex flex-col w-full max-w-xl">
			<label for="description" class=" text-sm">Organization Description:</label>
			<textarea
				name="description"
				class=" bg-transparent border border-gray-600 outline-none "
				required>{data?.org?.description}</textarea
			>
		</div>
		<div class="flex flex-col w-full max-w-xl">
			<label for="logo" class=" text-sm">Organization Logo URL:</label>
			<input
				type="text"
				name="logo"
				value={data?.org?.logo}
				class=" bg-transparent border-b border-gray-600 outline-none "
			/>
		</div>
		<div class="flex flex-col w-full max-w-xl">
			<label for="contactInfo" class=" text-sm">Organization Contact Info:</label>
			<input
				type="text"
				name="contactInfo"
				value={data?.org?.contactInfo}
				class=" bg-transparent border-b border-gray-600 outline-none "
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
								class={` bg-transparent border-b border-gray-600 ${
									i > prevSocialCount - 1 ? 'border-yellow-400' : ''
								} outline-none `}
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
								class={` bg-transparent border-b border-gray-600 ${
									i > prevSocialCount - 1 ? 'border-yellow-400' : ''
								} outline-none `}
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
					>+</button
				>
			</div>
			<input type="hidden" name="socials" value={jsonSocials} />
		</div>

		<div class="flex flex-col justify-center items-center gap-4">
			<button
				formaction="?/update"
				class="hover:rounded-lg transition-all   hover:border-transparent bg-blue-400 px-4"
				>Save Changes</button
			>
		</div>
	</form>
	<div class="grow ">
		<p>User Management</p>
		<ul class="flex flex-col justify-center text-center border border-gray-600">
			<div class="grid grid-cols-3 w-full lg:w-3/4 text-center mx-auto">
				<p>Actions</p>
				<p>Name</p>
				<p>Title</p>
			</div>
			{#each freelancers as freelancer}
				<form
					method="post"
					class=" m-2 mx-auto grid grid-cols-3 w-full lg:w-3/4 shadow-md border border-gray-600 p-2"
				>
					<input type="hidden" name="userId" value={freelancer.id} />
					<input type="hidden" name="orgId" value={data?.org?.id} />
					<div class="flex flex-col max-w-fit">
						<button
							formaction="?/removeFreelancer"
							class="hover:bg-red-400  text-gray-300 hover:rounded-lg transition-all">Remove</button
						>
						{#if freelancer.title === 'freelancer'}
							<button
								formaction="?/promoteFreelancer"
								class="hover:bg-green-400  text-gray-300 hover:rounded-lg transition-all"
								>Promote</button
							>
						{:else}
							<button
								formaction="?/demoteFreelancer"
								class="hover:bg-orange-400  text-gray-300 hover:rounded-lg transition-all"
								>Demote</button
							>
						{/if}
					</div>

					<p class="p-2 h-full flex gap-2 items-center w-full">
						<img src={freelancer.image} class="h-8" />{freelancer.name}
					</p>
					<p class="p-2 h-full flex justify-center items-center">{freelancer.title}</p>
				</form>
			{/each}
		</ul>
	</div>
</div>
<div class="flex justify-center gap-2">
	<a
		class="hover:rounded-lg transition-all   hover:border-transparent bg-yellow-400 px-4"
		href={`/orgs/${data?.org?.id}`}>Back</a
	>
	<form method="post">
		<input type="hidden" name="orgId" value={data?.org?.id} />
		{#if showDelete}
			<button
				class="hover:rounded-lg transition-all   hover:border-transparent bg-red-400 px-4"
				formaction="?/deleteOrg">DELETE ORGANIZATION - ARE YOU SURE?</button
			>
		{:else}
			<button
				class="hover:rounded-lg transition-all   hover:border-transparent bg-red-400 px-4"
				on:click|preventDefault={() => (showDelete = true)}
			>
				Delete Org
			</button>
		{/if}
	</form>
</div>
