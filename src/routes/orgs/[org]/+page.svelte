<script lang="ts">
	import Event from './Event.svelte';
	export let data;
	const events = data.events;
	const org = data.org;
</script>

<div class="text-3xl flex justify-center items-center gap-4 flex-col mb-10">
	<img src={org?.logo} alt="" class="h-[4em]" />
	<h1 class="text-center ">{org?.name}</h1>
</div>

<div class="w-full text-center flex flex-col gap-2 relative overflow-hidden">
	<div class="grid grid-cols-3">
		<span class="font-bold">Location</span>
		<span class="font-bold">Title</span>
		<span class="font-bold">Time</span>
	</div>

	{#each events as event}
		<Event name={event.name} location={event.location} date={String(event.date)} />
	{/each}
</div>
