<script lang="ts">
	import dayjs from 'dayjs';
	import Event from './Event.svelte';
	export let data;
	const events = data.events;
	const org: any = data.org;

	let viewCode = false;
	let showCreateEvent = false;

	function showCode() {
		viewCode = !viewCode;
		navigator.clipboard.writeText(String(org?.id));
	}
</script>

<div class="lg:grid lg:grid-cols-4 lg:gap-4">
	<div class="text-3xl flex justify-center items-center gap-2 flex-col mb-10 ">
		<div class="text-3xl flex justify-center items-center gap-2 flex-col">
			<a href={`/orgs/${data?.org?.name}`}><img src={org?.logo} alt="" class="h-[4em]" /></a>

			<h1 class="text-center ">{org?.name}</h1>
			<div class="w-full flex flex-wrap flex-row justify-center [&>*]:m-2 [&>*]:p-2 [&>*]:w-full">
				<div class="flex flex-col  text-sm w-full border">
					<span>Description:</span> <span>{org?.description}</span>
				</div>

				<p class="flex flex-col border  text-sm">
					<span>Contact:</span> <span>{org?.contactInfo}</span>
				</p>
				<div class="border col-span-2">
					<p class=" text-sm">Socials:</p>
					{#each org?.socials as social}
						<p class="text-sm">{social.site}: {social.handle}</p>
					{/each}
				</div>
			</div>
			{#if data.isManager}
				<div
					class="text-sm text-center cursor-pointer bg-slate-300 dark:bg-slate-800 hover:rounded-lg transition-all p-1"
					on:keydown={() => showCode()}
					on:click={() => showCode()}
				>
					{#if viewCode}
						<p>{org?.id}</p>
						<p class="text-sm">
							<span class="text-green-500">id copied to clipboard</span> - click again to hide
						</p>
					{:else}
						<p>View Join Code</p>
					{/if}
				</div>
				<a
					class="bg-red-400 text-sm text-center cursor-pointer hover:rounded-lg transition-all p-1"
					href={`/orgs/${org?.id}/manage`}>Manage {org?.name}</a
				>
			{/if}
		</div>
	</div>

	<div class="w-full text-center flex flex-col gap-2 relative overflow-hidden col-span-3">
		<div class="grid grid-cols-3">
			<span class="font-bold">Location</span>
			<span class="font-bold">Title</span>
			<span class="font-bold">Time</span>
		</div>

		{#each events as event}
			<a href={`/orgs/${org?.id}/${event?.id}`}>
				<Event name={event.name} location={event.location} date={String(event.date)} />
			</a>
		{/each}
		{#if data?.isManager}
			<form method="POST">
				<input type="hidden" name="orgId" value={org?.id} />
				{#if !showCreateEvent}
					<button
						on:click={() => (showCreateEvent = !showCreateEvent)}
						class="w-full z-0 bg-slate-300 cursor-pointer dark:bg-slate-800 transition-all overflow-hidden before:w-0 before:bg-blue-400 before:absolute hover:before:w-full before:h-10 before:transition-all before:duration-300 before:left-1/2 hover:before:left-0"
						><span class="z-20">+</span></button
					>
				{:else}
					<div class="w-full grid grid-cols-3 gap-2">
						<input
							class="bg-transparent border-b outline-none text-center"
							type="text"
							name="location"
							id="newlocation"
							required
						/>
						<input
							class="bg-transparent border-b outline-none text-center"
							type="text"
							name="name"
							id="newname"
							required
						/>
						<input
							class="bg-transparent border-b outline-none"
							type="datetime-local"
							name="date"
							required
						/>
					</div>
					<button
						class="bg-slate-300 dark:bg-slate-800  cursor-pointer hover:bg-blue-400 transition-all hover:rounded-lg p-1 "
						formaction="?/createEvent">Create</button
					>
				{/if}
			</form>
		{/if}
	</div>
</div>
