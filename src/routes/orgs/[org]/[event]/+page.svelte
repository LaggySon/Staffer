<script lang="ts">
	import type { Event, Position, User } from '@prisma/client';
	import dayjs from 'dayjs';
	import { page } from '$app/stores';
	import ExpandMore from '$lib/expandMore.svelte';
	import timezone from 'dayjs/plugin/timezone';
	import advancedFormat from 'dayjs/plugin/advancedFormat';
	import Delete from '$lib/delete.svelte';
	import Check from '$lib/check.svelte';

	dayjs.extend(timezone);
	dayjs.extend(advancedFormat);

	export let data: any;

	type newPos = Position & {
		filledBy: User;
		declared: boolean;
		freelancers: User[];
	};

	const positions: newPos[] = data?.eventData?.positions as newPos[];
	console.log(positions);

	let expand = '';

	let showDelete = false;

	const handleDelete = () => {
		if (!showDelete) {
			showDelete = true;
		}
	};
</script>

<div class="flex justify-center gap-4">
	<a href={`/orgs/${data?.org?.id}`}>
		<img src={data.org?.logo} height="100" width="100" alt="" />
	</a>

	{#if data?.isManager}
		<form
			class="flex items-center flex-col [&>input]:bg-transparent [&>input]:border-b"
			method="POST"
		>
			<input
				type="text"
				value={data?.eventData?.name}
				name="name"
				class="text-center text-3xl outline-none"
				placeholder="Event Title"
				required
			/>
			<div class="text-center ">
				<p>
					Location: <input
						class="bg-transparent border-b outline-none"
						type="text"
						name="location"
						value={data?.eventData?.location}
						required
						placeholder="Event Location"
					/>
				</p>
				<p>
					Time: <input
						class="bg-transparent border-b outline-none"
						type="datetime-local"
						name="date"
						value={dayjs(data?.eventData?.date).format('YYYY-MM-DDTHH:mm')}
						required
					/>
					<span class="text-sm">({dayjs(data?.eventData?.date).format('z')})</span>
				</p>
			</div>
			<input type="hidden" name="eventId" value={data?.eventData?.id} />

			<button
				formaction="?/updateEvent"
				class="hover:rounded-lg transition-all mt-4 bg-blue-400 px-4">Save Changes</button
			>
		</form>
	{:else}
		<div class="flex items-center flex-col">
			<h1 class="text-center text-3xl">{data?.eventData?.name}</h1>
			<div class="text-center">
				<p>Location: {data?.eventData?.location}</p>
				<p>Time: {dayjs(data?.eventData?.date).format('MM/DD/YYYY @ HH:mm z')}</p>
			</div>
		</div>
	{/if}
</div>

<h2 class="text-2xl mt-10 text-center">Positions</h2>
<div class=" text-center">
	<div class="grid grid-cols-3 border-b mb-2">
		<span class="text-lg font-bold">Actions</span>
		<span class="text-lg font-bold">Title</span>
		<span class="text-lg font-bold">Compensation</span>
	</div>

	{#each positions as position}
		<form class="grid grid-cols-3 my-2 border-b pb-2" method="POST" action="?/declare">
			<div class="flex justify-center flex-wrap items-center gap-2 relative">
				{#if data.isManager}
					<form method="POST" class="flex items-center">
						<input type="hidden" name="posId" value={position.id} />
						<button
							class="bg-slate-300 dark:bg-slate-800  cursor-pointer hover:bg-red-400 transition-all hover:rounded-lg p-1 "
							formaction="?/deletePosition"
							title="Delete Position"><Delete /></button
						>
					</form>
					<button
						class="bg-slate-300 dark:bg-slate-800  cursor-pointer hover:bg-blue-400 transition-all hover:rounded-lg p-1 "
						formaction="?/updatePosition"
						title="Update Position"><Check /></button
					>
					<input type="hidden" name="posId" value={position.id} />
					<div class="relative">
						<div class="flex items-center">
							<button
								class="bg-slate-300 dark:bg-slate-800  cursor-pointer hover:bg-blue-400 transition-all hover:rounded-lg p-1 "
								on:click|preventDefault={() => (expand = expand === position.id ? '' : position.id)}
								title="Choose Freelancer"><ExpandMore /></button
							>
						</div>
						{#if expand === position.id}
							<div class="absolute top-5 bg-slate-300 dark:bg-slate-800 z-10">
								{#each position.freelancers as freelancer}
									<form method="POST" action="?/assign">
										<input type="hidden" name="email" value={freelancer.email} />
										<input type="hidden" name="positionId" value={position.id} />
										<input
											class="hover:bg-blue-400  hover:rounded-lg transition-all cursor-pointer"
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

				{#if !position.declared && !position.filledBy}
					<button
						formaction="?/declare"
						class=" cursor-pointer  bg-green-400 transition-all hover:rounded-lg px-2 w-full"
						>Set Available</button
					>
				{:else if position.declared && !position.filledBy}
					<button
						formaction="?/removeDec"
						class=" cursor-pointer bg-orange-400 transition-all hover:rounded-lg px-2 w-full"
						>Undo Available</button
					>
				{:else if position.filledBy.email === $page.data.session?.user?.email}
					<span class="bg-slate-300 dark:bg-slate-800    w-full">Filled By You</span>
				{:else}
					<span class="bg-slate-300 dark:bg-slate-800    w-full"
						>Filled By: {position.filledBy.name}</span
					>
				{/if}
			</div>

			<input type="hidden" name="positionId" value={position.id} />
			<input type="hidden" name="email" value={$page?.data?.session?.user?.email} />
			{#if data.isManager}
				<div>
					<input
						type="text"
						name="newTitle"
						value={position.title}
						class="outline-none bg-transparent   text-center h-full w-full underline"
						placeholder="title"
						required
					/>
				</div>

				<input
					type="text"
					name="newCompensation"
					value={position.compensation}
					class="outline-none bg-transparent  text-center h-full w-full underline"
					placeholder="compensation"
					required
				/>
			{:else}
				<span>{position.title}</span>
				<span>{position.compensation}</span>
			{/if}
		</form>
	{/each}

	{#if data?.isManager}
		<form method="post">
			<input type="hidden" name="eventId" value={data.eventData.id} />
			<button
				formaction="?/createPosition"
				class="mt-5 bg-slate-300 dark:bg-slate-800 hover:bg-blue-400 hover:rounded-lg transition-all p-1"
				>Create Position</button
			>
		</form>
		<form method="POST">
			<input type="hidden" name="eventId" value={data.eventData.id} />
			{#if showDelete}
				<button
					class="inline bg-red-400 mt-10 p-2 text-sm hover:rounded-lg transition-all"
					formaction="?/deleteEvent">DELETE EVENT - ARE YOU SURE?</button
				>
			{:else}
				<button
					class="inline bg-red-400 mt-10 p-2 text-sm hover:rounded-lg transition-all"
					on:click|preventDefault={() => (showDelete = true)}
				>
					Delete Event
				</button>
			{/if}
		</form>
	{/if}
</div>
