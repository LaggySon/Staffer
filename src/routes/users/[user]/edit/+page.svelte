<script lang="ts">
	import Delete from '$lib/delete.svelte';
	import { marked } from 'marked';

	export let data;
	function getSocials(): any {
		let socials: any = data?.socials;
		socials = socials.map((social: any) => {
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

	const prevSocialCount = socials.length;

	let bio = data?.user?.biography;
	let contactInfo = data?.user?.contactInfo;

	let preview = false;
</script>

<form method="post" action="?/update">
	<div class="flex mb-2 flex-col w-full items-center justify-center">
		<p>Name</p>
		<input
			class="border-gray-600 border rounded-lg bg-transparent text-center text-xl outline-none border-gray-600"
			type="text"
			name="name"
			id=""
			value={data?.user?.name}
		/>
	</div>
	<div class="lg:grid lg:grid-cols-2  lg:grid-flow-col flex flex-col ">
		<div class=" flex flex-col gap-4 justify-center items-center">
			<p class="">Socials</p>
			<div class="flex flex-col items-center ">
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
		<div class="col-start-2">
			<p class="text-center">Contact Info</p>
			<div class="flex justify-center">
				<textarea
					class="bg-transparent rounded-lg border border-gray-600 w-full lg:w-1/2  h-48 p-2 font-mono"
					name="contactInfo"
					id="contactInfo"
					bind:value={contactInfo}
				/>
			</div>
		</div>
	</div>
	<p class="text-center">About Me</p>
	{#if !preview}
		<textarea
			class="bg-transparent rounded-lg border border-gray-600 w-full h-96 p-2 font-mono"
			name="bio"
			id="bio"
			bind:value={bio}
		/>
	{:else}
		<div
			class="p-2 text-left border rounded-lg border-gray-600 dark:prose-invert prose w-full max-w-none "
		>
			{@html marked(String(bio), { mangle: false, headerIds: false })}
		</div>
	{/if}

	<button
		class="hover:bg-blue-400  text-gray-300 hover:rounded-lg transition-all text-center p-1"
		on:click|preventDefault={() => (preview = !preview)}>Preview</button
	>

	<input type="hidden" name="userId" value={data?.user?.id} />
	<br />
	<input
		type="submit"
		value="submit"
		class="hover:bg-blue-400  text-gray-300 hover:rounded-lg transition-all text-center p-1 w-full"
	/>
</form>
