<script lang="ts">
	import Event from './Event.svelte';
	const events = [
		{ name: 'Play Ins', location: 'Virtual', date: '03/18/2023' },
		{ name: 'Play Ins', location: 'Virtual', date: '03/18/2023' },
		{ name: 'Play Ins', location: 'Virtual', date: '03/18/2023' },
		{ name: 'Play Ins', location: 'Virtual', date: '03/18/2023' }
	];
</script>

<div class="w-full text-center flex flex-col gap-2 relative overflow-hidden">
	<div class="grid grid-cols-3">
		<span class="font-bold">Location</span>
		<span class="font-bold">Title</span>
		<span class="font-bold">Date</span>
	</div>

	{#each events as event}
		<Event name={event.name} location={event.location} date={event.date} />
	{/each}
</div>
