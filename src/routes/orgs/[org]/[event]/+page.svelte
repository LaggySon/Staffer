<script lang="ts">
	import type { Position, User } from '@prisma/client';
	import dayjs from 'dayjs';
	import { page } from '$app/stores';
	import ExpandMore from '$lib/expandMore.svelte';
	export let data;

	type newPos = Position & {
		filledBy: User;
		declared: boolean;
		freelancers?: User[];
	};

	const positions = data?.eventData?.positions as newPos[];

	let expand = '';
</script>

<div class="flex justify-center gap-4">
	<a href={`/orgs/${data?.org?.name}`}
		><img src={data.org?.logo} height="100" width="100" alt="" /></a
	>

	<div class="flex items-center flex-col">
		<h1 class="text-center text-3xl">{data?.eventData?.name}</h1>
		<div class="text-center">
			<p>Location: {data?.eventData?.location}</p>
			<p>Time: {dayjs(data?.eventData?.date).format('MM/DD/YYYY @ HH:mm')}</p>
		</div>
	</div>
</div>

<h2 class="text-2xl mt-10 text-center">Positions</h2>
<div class=" text-center">
	<div class="grid grid-cols-3 border-b mb-2">
		<span class="text-lg font-bold">Status</span>
		<span class="text-lg font-bold">Title</span>
		<span class="text-lg font-bold">Compensation</span>
	</div>

	{#each positions as position}
		<form class="grid grid-cols-3 my-2" method="POST" action="?/declare">
			<div class="flex justify-center items-center gap-2 relative">
				{#if !position.declared && !position.filledBy}
					<button
						formaction="?/declare"
						class="bg-slate-800 cursor-pointer hover:bg-blue-400 transition-all hover:rounded-lg px-2"
						>+</button
					>
					<span class="bg-green-400 p-1">Available</span>
				{:else if position.declared && !position.filledBy}
					<button
						formaction="?/removeDec"
						class="bg-slate-800 cursor-pointer hover:bg-red-400 transition-all hover:rounded-lg px-2"
						>-</button
					>
					<span class="bg-orange-400 p-1">Pending</span>
				{:else if position.filledBy.email === $page.data.session?.user?.email}
					<span class="bg-blue-400 text-white p-1">Filled By You</span>
				{:else}
					<span class="bg-red-400 text-white p-1">Filled By: {position.filledBy.name}</span>
				{/if}
				{#if data.isManager}
					<div class="relative">
						<button
							class="bg-slate-800 cursor-pointer hover:bg-blue-400 transition-all hover:rounded-lg px-2 "
							on:click|preventDefault={() => (expand = expand === position.id ? '' : position.id)}
							><ExpandMore /></button
						>
						{#if expand === position.id}
							<div class="absolute top-5 bg-slate-800 p-2 z-10">
								{#each position.freelancers as freelancer}
									<form method="POST" action="?/assign">
										<input type="hidden" name="email" value={freelancer.email} />
										<input type="hidden" name="positionId" value={position.id} />
										<input
											class="hover:bg-blue-400 p-1 hover:rounded-lg transition-all cursor-pointer"
											type="submit"
											value={freelancer.name}
										/>
									</form>
								{/each}
								{#if position.filledBy}
									<form method="POST" action="?/removeAssignment">
										<input type="hidden" name="positionId" value={position.id} />
										<input
											class="hover:bg-red-400 p-1 hover:rounded-lg transition-all cursor-pointer"
											type="submit"
											value="Remove Selection"
										/>
									</form>
								{/if}
							</div>
						{/if}
					</div>
				{/if}
			</div>

			<input type="hidden" name="positionId" value={position.id} />
			<input type="hidden" name="email" value={$page?.data?.session?.user?.email} />
			<span>{position.title}</span>
			<span>{position.compensation}</span>
		</form>
	{/each}
</div>
