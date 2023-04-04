<script lang="ts">
	import type { Position } from '@prisma/client';
	import dayjs from 'dayjs';
	import { page } from '$app/stores';
	export let data;

	const positions = data?.eventData?.positions as Position[];
</script>

<h1 class="text-center text-3xl">{data?.eventData?.name}</h1>
<div class="text-center">
	<p>Location: {data?.eventData?.location}</p>
	<p>Time: {dayjs(data?.eventData?.date).format('MM/DD/YYYY @ HH:mm')}</p>
</div>

<h2 class="text-2xl mt-10 text-center">Positions</h2>
<div class=" text-center">
	<div class="grid grid-cols-4">
		<span class="text-lg font-bold">Available?</span>
		<span class="text-lg font-bold">Title</span>
		<span class="text-lg font-bold">Compensation</span>
		<span class="text-lg font-bold">Filled By</span>
	</div>

	{#each positions as position}
		<form class="grid grid-cols-4" method="POST" action="?/declare">
			<input
				type="submit"
				value="Mark Available"
				class="bg-slate-800 cursor-pointer hover:bg-blue-400 transition-all hover:rounded-lg"
			/>
			<input type="hidden" name="positionId" value={position.id} />
			<input type="hidden" name="email" value={$page?.data?.session?.user?.email} />
			<span>{position.title}</span>
			<span>{position.compensation}</span>
			<span>{position.filledBy.name}</span>
		</form>
	{/each}
</div>
