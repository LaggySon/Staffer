<script lang="ts">
	import Event from './Event.svelte';
	export let data;
	const events = data.events;
	const org = data.org;

	let viewCode = false;

	function showCode() {
		viewCode = !viewCode;
		navigator.clipboard.writeText(String(org?.id));
	}
</script>

<div class="text-3xl flex justify-center items-center gap-4 flex-col mb-10">
	<img src={org?.logo} alt="" class="h-[4em]" />
	<h1 class="text-center ">{org?.name}</h1>
	{#if data.isManager}
		<div
			class="text-lg text-center cursor-pointer bg-slate-300 dark:bg-slate-800 p-1"
			on:keydown={() => showCode()}
			on:click={() => showCode()}
		>
			{#if viewCode}
				<p>{org?.id}</p>
				<p class="text-sm">
					<span class="text-green-500">id copied to clipboard</span> - click again to hide
				</p>
			{:else}
				<p>view join code</p>
			{/if}
		</div>
	{/if}
</div>

<div class="w-full text-center flex flex-col gap-2 relative overflow-hidden">
	<div class="grid grid-cols-3">
		<span class="font-bold">Location</span>
		<span class="font-bold">Title</span>
		<span class="font-bold">Time</span>
	</div>

	{#each events as event}
		<a href={`/orgs/${org?.name}/${event?.id}`}>
			<Event name={event.name} location={event.location} date={String(event.date)} />
		</a>
	{/each}
</div>
