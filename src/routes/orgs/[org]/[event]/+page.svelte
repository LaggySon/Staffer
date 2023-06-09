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

	type fb = {
		email: string | null;
		name: string | null;
	};

	type newPos = Position & {
		filledBy: fb | null;
		declared: boolean;
		freelancers: User[];
	};

	let positions: newPos[] = data?.eventData?.positions.map((pos: any) => {
		return { ...pos, filledBy: { email: pos?.filledBy?.email, name: pos?.filledBy?.name } };
	}) as newPos[];

	$: jsonPositions = JSON.stringify(positions);

	const createPosition = () => {
		positions = [
			...positions,
			{
				id: 'new',
				title: '',
				compensation: '',
				filled: false,
				eventId: String(data?.eventData?.id),
				declared: false,
				freelancers: [],
				userId: null,
				filledBy: null
			}
		];
	};

	const deletePosition = (position: newPos) => {
		positions = positions.filter((p) => p !== position);
		console.log('deleted' + position);
	};

	const declarePosition = (index: number) => {
		positions[index].declared = !positions[index].declared;
	};

	const removeUser = (index: number) => {
		positions[index].userId = null;
		positions[index].filledBy = null;
		positions[index].filled = false;
		expand = '';
	};

	const fillPos = (index: number, freelancer: fb) => {
		console.log(freelancer);
		if (positions[index].filledBy?.email !== null) {
			positions[index].filledBy!.email = freelancer.email;
			positions[index].filledBy!.name = freelancer.name;
		} else {
			positions[index].filledBy = {
				name: freelancer.name,
				email: freelancer.email
			};
		}
		positions[index].filled = true;
		expand = '';
	};

	let expand = '';

	let showDelete = false;

	const handleDelete = () => {
		if (!showDelete) {
			showDelete = true;
		}
	};
</script>

<form method="post">
	<input type="hidden" name="positions" value={jsonPositions} />
	<input type="hidden" name="userEmail" value={$page?.data?.session?.user?.email} />
	<div class="flex justify-center gap-4">
		<a href={`/orgs/${data?.org?.id}`}>
			<img src={data.org?.logo} height="100" width="100" alt="" />
		</a>

		{#if data?.isManager}
			<div class="flex items-center flex-col [&>input]:bg-transparent [&>input]:border-b">
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
			</div>
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

		{#each positions.sort((a, b) => a.title.localeCompare(b.title)) as position, i}
			<div class="grid grid-cols-3 my-2 border-b pb-2">
				<div class="flex justify-center flex-wrap items-center gap-2 relative">
					{#if data.isManager}
						<button
							class="bg-slate-300 dark:bg-slate-800  cursor-pointer hover:bg-red-400 transition-all hover:rounded-lg p-1 "
							on:click|preventDefault={() => deletePosition(position)}
							title="Delete Position"><Delete /></button
						>
						<div class="relative">
							<div class="flex items-center">
								<button
									class="bg-slate-300 dark:bg-slate-800  cursor-pointer hover:bg-blue-400 transition-all hover:rounded-lg p-1 "
									on:click|preventDefault={() =>
										(expand = expand === position.id ? '' : position.id)}
									title="Choose Freelancer"><ExpandMore /></button
								>
							</div>
							{#if expand === position.id}
								<div class="absolute top-5 bg-slate-300 dark:bg-slate-800 z-10">
									{#each position.freelancers.filter((freelancer) => freelancer.name !== position.filledBy?.name) as freelancer}
										<button
											class="hover:bg-blue-400  hover:rounded-lg transition-all cursor-pointer"
											on:click|preventDefault={() =>
												fillPos(i, { email: freelancer.email, name: freelancer.name })}
											>{freelancer.name}</button
										>
									{/each}
									{#if position.filled}
										<button
											class="hover:bg-red-400 p-1 hover:rounded-lg transition-all cursor-pointer"
											on:click|preventDefault={() => removeUser(i)}>Remove Selection</button
										>
									{/if}
								</div>
							{/if}
						</div>
					{/if}

					{#if !position.declared && !position.filled}
						<button
							on:click|preventDefault={() => declarePosition(i)}
							class=" cursor-pointer  bg-green-400 transition-all hover:rounded-lg px-2"
							>Set Available</button
						>
					{:else if position.declared && !position.filled}
						<button
							on:click|preventDefault={() => declarePosition(i)}
							class=" cursor-pointer bg-orange-400 transition-all hover:rounded-lg px-2"
							>Undo Available</button
						>
					{:else if position?.filledBy?.email === $page.data.session?.user?.email}
						<span class="bg-slate-300 dark:bg-slate-800">Filled By You</span>
					{:else}
						<span class="bg-slate-300 dark:bg-slate-800">Filled By: {position?.filledBy?.name}</span
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
							bind:value={positions[i].title}
							class="outline-none bg-transparent   text-center h-full w-full underline"
							placeholder="title"
							required
						/>
					</div>

					<input
						type="text"
						name="newCompensation"
						bind:value={positions[i].compensation}
						class="outline-none bg-transparent  text-center h-full w-full underline"
						placeholder="compensation"
						required
					/>
				{:else}
					<span>{position.title}</span>
					<span>{position.compensation}</span>
				{/if}
			</div>
		{/each}

		{#if data?.isManager}
			<button
				on:click|preventDefault={() => createPosition()}
				class="mt-5 bg-slate-300 dark:bg-slate-800 hover:bg-blue-400 hover:rounded-lg transition-all p-1"
				>Create Position</button
			>

			<input type="hidden" name="eventId" value={data.eventData.id} />
			<button
				formaction="?/updateEvent"
				class="hover:rounded-lg transition-all mt-4 bg-blue-400 px-4">Save Changes</button
			>
			{#if showDelete}
				<button
					class="hover:rounded-lg transition-all mt-4 bg-red-400 px-4"
					formaction="?/deleteEvent">DELETE EVENT - ARE YOU SURE?</button
				>
			{:else}
				<button
					class="hover:rounded-lg transition-all mt-4 bg-red-400 px-4"
					on:click|preventDefault={() => (showDelete = true)}
				>
					Delete Event
				</button>
			{/if}
		{/if}
	</div>
</form>
