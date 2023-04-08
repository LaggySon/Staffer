<script lang="ts">
	import type { Social } from '@prisma/client';
	import { each } from 'svelte/internal';

	export let data;

	let socials: any = data?.org?.socials;
</script>

<div class="flex justify-center items-center mb-10 gap-4">
	<a href={`/orgs/${data?.org?.name}`} class="flex justify-center"
		><img src={data?.org?.logo} alt="" class="h-[4em]" /></a
	>

	<h1 class=" text-xl ">Managing {data?.org?.name}</h1>
</div>

<form action="?/update" method="post" class=" flex flex-col gap-4 justify-center items-center ">
	<input type="hidden" name="socials" value={socials} />
	<input type="hidden" name="orgId" value={data?.org?.id} />
	<div class="flex flex-col w-3/4">
		<label for="name" class="text-center">Organization Name:</label>
		<input
			value={data?.org?.name}
			type="text"
			name="name"
			class="text-center bg-transparent border-b outline-none text-gray-400"
			required
		/>
	</div>
	<div class="flex flex-col w-3/4">
		<label for="description" class="text-center">Organization Description:</label>
		<textarea
			name="description"
			class="text-center bg-transparent border outline-none text-gray-400"
			required>{data?.org?.description}</textarea
		>
	</div>
	<div class="flex flex-col w-3/4">
		<label for="logo" class="text-center">Organization Logo URL:</label>
		<input
			type="text"
			name="logo"
			value={data?.org?.logo}
			class="text-center bg-transparent border-b outline-none text-gray-400"
			required
		/>
	</div>
	<div class="flex flex-col w-3/4">
		<label for="contactInfo" class="text-center">Organization Contact Info:</label>
		<input
			type="text"
			name="contactInfo"
			value={data?.org?.contactInfo}
			class="text-center bg-transparent border-b outline-none text-gray-400"
			required
		/>
	</div>
	<button formaction="?/update" class="hover:rounded-lg transition-all mb-8 bg-blue-400 px-4"
		>Save Changes</button
	>
</form>
<div class=" flex flex-col gap-4 justify-center items-center ">
	<p class="text-center">Socials</p>
	<div class="border flex flex-col items-center">
		{#each socials as social, i}
			<form method="POST" class="flex flex-col gap-2 m-4">
				<input type="hidden" name="socialId" value={social.id} />
				<p>
					Website: <input
						required
						type="text"
						bind:value={socials[i].site}
						class="text-center bg-transparent border-b outline-none text-gray-400"
					/>
				</p>
				<p>
					Handle: <input
						required
						type="text"
						bind:value={socials[i].handle}
						class="text-center bg-transparent border-b outline-none text-gray-400"
					/>
				</p>
				<button
					class="hover:rounded-lg transition-all mx-4 border hover:border-transparent hover:bg-red-400 px-4"
					formaction="?/deleteSocial">-</button
				>
			</form>
		{/each}
		<form method="post">
			<input type="hidden" name="orgId" value={data?.org?.id} />
			<button
				formaction="?/createSocial"
				class="hover:rounded-lg transition-all m-4 border hover:border-transparent hover:bg-blue-400 px-4"
			>
				+
			</button>
		</form>
	</div>
	<a
		class="hover:rounded-lg transition-all m-8 border hover:border-transparent hover:bg-red-400 px-4"
		href={`/orgs/${data?.org?.name}`}>Back</a
	>
</div>
