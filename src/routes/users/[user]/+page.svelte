<script lang="ts">
	export let data;

	const events = data?.events;

	let bio = data?.user?.biography;
	let orgs = data?.orgs;
	let user = data?.user;

	console.log(data?.user?.email);
</script>

<div class="grid grid-cols-4 gap-4 w-full relative">
	<div class="flex flex-col sticky h-[90vh] top-2 gap-4">
		<div class="flex flex-col row-span-1">
			<img src={data?.user?.image} alt="" class="w-full" />
			<p class="text-center text-3xl">{data?.user?.name}</p>
		</div>
		<div class="grid grid-rows-5 gap-4 col-span-1 ">
			<div class="row-span-2 border rounded-lg p-2">TODO - Add Socials</div>
			<div class="row-span-3  border rounded-lg p-2">
				<p>{user?.contactInfo}</p>
			</div>
		</div>
	</div>

	<div class="flex w-full col-span-3 flex-col gap-4 col-start-2">
		<div class="col-span-3  border rounded-lg p-2">
			<p>{user?.biography}</p>
		</div>
		<div class="col-span-3  ">
			<p class="text-center text-2xl mb-2">Organizations</p>
			<div class="flex gap-4 justify-center">
				{#each orgs as org}
					<div>
						<img
							src={org?.logo === '' ? '/android-chrome-512x512.png' : org?.logo}
							alt=""
							class="h-20"
						/>
						<p class="text-center">{org.name}</p>
					</div>
				{/each}
			</div>
		</div>
		<p class="text-center text-2xl">Events</p>
		{#each events as event}
			<div class="col-span-3 border rounded-lg p-2  flex gap-4">
				<img
					src={event.Organization?.logo === ''
						? '/android-chrome-512x512.png'
						: event.Organization?.logo}
					alt=""
					class="h-14"
				/>
				<div class="flex flex-col justify-center ">
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
			</div>
		{/each}
	</div>
</div>
