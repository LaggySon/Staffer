<script lang="ts">
	export let data;

	const events = data?.events;

	console.log(data?.user?.email);
</script>

<div class="mx-auto text-center flex justify-center items-center flex-col">
	<div class="w-32 h-32"><img src={data?.user?.image} alt="" /></div>
	<div class="text-2xl">{data?.user?.name}</div>
	{#each events as event}
		<p>
			{event.name} - {event.positions
				.filter((e) => e.userId === data?.user?.id)
				.map((e) => e.title)
				.join(', ')}
		</p>
	{/each}
</div>
