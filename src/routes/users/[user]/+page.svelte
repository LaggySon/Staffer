<script lang="ts">
	export let data;

	const events = data?.events;

	let bio = data?.user?.biography;

	console.log(data?.user?.email);
</script>

<!-- <div class='grid grid'>
	<div class="static">
		<h1>sidebar</h1>
	</div>
	<div class="mx-auto text-center flex justify-center items-center flex-col">
		<div class="w-32 h-32"><img src={data?.user?.image} alt="" /></div>
		<div class="text-2xl">{data?.user?.name}</div>
		{#each events as event}
			<p>
				{event.name} - {event.positions
					.filter((e:any) => e.userId === data?.user?.id)
					.map((f:any) => f.title)
					.join(', ')}
			</p>
		{/each}
	</div>
</div> -->

<div class="grid grid-cols-4 gap-4 w-full relative">
	<div class="grid grid-rows-5 gap-4 col-span-1 sticky h-[90vh] top-2">
		<div class="row-span-2">
			<img src={data?.user?.image} alt="" class="w-full" />
			<p class="text-center text-3xl">{data?.user?.name}</p>
		</div>
		<div class="row-start-3 bg-green-400">Socials</div>
		<div class="row-span-2 col-start-1 row-start-4 bg-green-400">Contact Info</div>
	</div>

	<div class="flex w-full col-span-3 flex-col gap-4 col-start-2">
		<div class="col-span-3  bg-green-400">Bio</div>
		<div class="col-span-3  bg-green-400">Orgs</div>
		{#each events as event}
			<div class="col-span-3  bg-green-400">
				<p>
					{event.name}
				</p>
				<p>
					{event.positions
						.filter((e) => e.userId === data?.user?.id)
						.map((f) => f.title)
						.join(', ')}
				</p>
			</div>
		{/each}
		<div class="col-span-3  bg-green-400">
			<p>1</p>
			<p>2</p>
		</div>
		<div class="col-span-3  bg-green-400">
			<p>1</p>
			<p>2</p>
		</div>
		<div class="col-span-3  bg-green-400">
			<p>1</p>
			<p>2</p>
		</div>
		<div class="col-span-3  bg-green-400">
			<p>1</p>
			<p>2</p>
		</div>
		<div class="col-span-3  bg-green-400">
			<p>1</p>
			<p>2</p>
		</div>
		<div class="col-span-3  bg-green-400">
			<p>1</p>
			<p>2</p>
		</div>
		<div class="col-span-3  bg-green-400">
			<p>1</p>
			<p>2</p>
		</div>
		<div class="col-span-3  bg-green-400">
			<p>1</p>
			<p>2</p>
		</div>
		<div class="col-span-3  bg-green-400">
			<p>1</p>
			<p>2</p>
		</div>
		<div class="col-span-3  bg-green-400">
			<p>1</p>
			<p>2</p>
		</div>
		<div class="col-span-3  bg-green-400">
			<p>1</p>
			<p>2</p>
		</div>
		<div class="col-span-3  bg-green-400">
			<p>1</p>
			<p>2</p>
		</div>
	</div>
</div>
