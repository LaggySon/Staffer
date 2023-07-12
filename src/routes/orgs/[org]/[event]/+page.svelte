<script lang="ts">
	import type { Event, Position, User } from '@prisma/client';
	import dayjs from 'dayjs';
	import { page } from '$app/stores';
	import ExpandMore from '$lib/expandMore.svelte';
	import timezone from 'dayjs/plugin/timezone';
	import utc from 'dayjs/plugin/utc';
	import advancedFormat from 'dayjs/plugin/advancedFormat';
	import Delete from '$lib/delete.svelte';
	import Check from '$lib/check.svelte';
	import { marked } from 'marked';
	import * as ics from 'ics';
	import helpers from '$lib/CalLinks';

	dayjs.extend(timezone);
	dayjs.extend(advancedFormat);
	dayjs.extend(utc);

	export let data: any;

	const help: any = new helpers();

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
	positions = positions.sort((a, b) => a.title.localeCompare(b.title));

	$: jsonPositions = JSON.stringify(positions);
	let description = String(data?.eventData?.description);

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
	let editDesc = false;
	let location = data?.eventData?.location;

	const handleDelete = () => {
		if (!showDelete) {
			showDelete = true;
		}
	};

	$: startTime = dayjs(data?.eventData?.startAt).tz(dayjs.tz.guess()).format('YYYYMMDDTHHmmssZ');

	$: endTime = dayjs(data?.eventData?.endAt).tz(dayjs.tz.guess()).format('YYYYMMDDTHHmmssZ');

	const getUrl = (site: string) => {
		return help.buildUrl(
			{
				startTime: dayjs(data?.eventData?.startAt),
				endTime: dayjs(data.eventData?.endAt),
				description,
				location,
				title: data?.eventData?.name
			},
			site,
			false
		);
	};
</script>

<form method="post">
	<input type="hidden" name="positions" value={jsonPositions} />
	<input type="hidden" name="userEmail" value={$page?.data?.session?.user?.email} />

	<div class="flex justify-center gap-4 w-full">
		{#if editDesc}
			<div class="flex items-center flex-col [&>input]:bg-transparent [&>input]:border-b w-full ">
				<input
					type="text"
					value={data?.eventData?.name}
					name="name"
					class="text-center text-3xl outline-none border-gray-600"
					placeholder="Event Title"
					required
				/>
				<div class="text-center flex flex-col gap-2">
					<p>
						Location: <input
							class="bg-transparent border-b border-gray-600 outline-none"
							type="text"
							name="location"
							value={data?.eventData?.location}
							required
							placeholder="Event Location"
						/>
					</p>

					<div class="flex gap-2 mb-2">
						<div class="border border-gray-600 m-2 p-2">
							<p>Start Time:</p>
							<input
								class="bg-transparent border-b border-gray-600 outline-none bg-gray-800"
								type="datetime-local"
								name="startAt"
								value={dayjs(data?.eventData?.startAt).format('YYYY-MM-DDTHH:mm')}
								required
							/>
							<span class="text-sm">({dayjs(0).format('z')})</span>
						</div>
						<div class="border border-gray-600 m-2 p-2">
							<p>End Time:</p>
							<input
								class="bg-transparent border-b border-gray-600 outline-none bg-gray-800"
								type="datetime-local"
								name="endAt"
								value={dayjs(data?.eventData?.endAt).format('YYYY-MM-DDTHH:mm')}
								required
							/>
							<span class="text-sm">({dayjs(0).format('z')})</span>
						</div>
					</div>
				</div>
				{#if editDesc}
					<p class="flex w-full">
						<textarea
							class="bg-transparent border border-gray-600 w-full h-96 p-2 font-mono"
							name="description"
							id="description"
							bind:value={description}
						/>
					</p>
				{/if}
				{#if data?.isManager}
					<button
						class="mt-5 bg-gray-300 dark:bg-gray-800 hover:bg-yellow-400 hover:rounded-lg transition-all p-1"
						on:click|preventDefault={() => (editDesc = !editDesc)}
						>{!editDesc ? 'Edit' : 'Done'}</button
					>
				{/if}

				<input type="hidden" name="eventId" value={data?.eventData?.id} />
			</div>
		{:else}
			<div class="flex items-center flex-col w-full">
				<h1 class="text-center text-3xl">{data?.eventData?.name}</h1>
				<div class="text-center w-full">
					<p>Location: {data?.eventData?.location}</p>
					<div class="flex gap-2 justify-center">
						<div class="border border-gray-600 m-2 p-2">
							<p>Start Time:</p>
							{dayjs(data?.eventData?.startAt).format('MM/DD/YYYY @ HH:mm z')}
						</div>
						<div class="border border-gray-600 m-2 p-2">
							<p>End Time:</p>
							{dayjs(data?.eventData?.endAt).format('MM/DD/YYYY @ HH:mm z')}
						</div>
					</div>
					<div class="mb-2">
						<a
							class=" bg-gray-300 dark:bg-gray-800 hover:bg-blue-400 hover:rounded-lg transition-all p-1"
							href={getUrl('google')}>Add to Google Calendar</a
						>
						<a
							class=" bg-gray-300 dark:bg-gray-800 hover:bg-blue-400 hover:rounded-lg transition-all p-1"
							href={getUrl('outlookcom')}>Add to Outlook Calendar</a
						>
					</div>
					<div class="mb-2" />

					<input type="hidden" name="location" value={data?.eventData?.location} />
					<input type="hidden" name="startAt" value={data?.eventData?.startAt} />
					<input type="hidden" name="endAt" value={data?.eventData?.endAt} />
					<input type="hidden" name="name" value={data?.eventData?.name} />
					<input type="hidden" name="eventId" value={data?.eventData?.id} />
					<input type="hidden" name="description" value={description} />
					<div
						class="p-2 text-left border border-gray-600 dark:prose-invert prose w-full max-w-none "
					>
						{@html marked(description, { mangle: false, headerIds: false })}
					</div>
					{#if data?.isManager}
						<button
							class="mt-5 bg-gray-300 dark:bg-gray-800 hover:bg-yellow-400 hover:rounded-lg transition-all p-1"
							on:click|preventDefault={() => (editDesc = !editDesc)}
							>{!editDesc ? 'Edit' : 'Done'}</button
						>
					{/if}
				</div>
			</div>
		{/if}
	</div>

	<h2 class="text-2xl mt-10 text-center">Positions</h2>
	<div class=" text-center">
		<div class="grid grid-cols-3 border-b border-gray-600 mb-2">
			<span class="text-lg font-bold">Actions</span>
			<span class="text-lg font-bold">Title</span>
			<span class="text-lg font-bold">Compensation</span>
		</div>

		{#each positions as position, i}
			<div class="grid grid-cols-3 my-2 border-b border-gray-600 pb-2">
				<div class="flex justify-center flex-wrap items-center gap-2 relative">
					{#if data.isManager}
						<button
							class="bg-gray-300 dark:bg-gray-800  cursor-pointer hover:bg-red-400 transition-all hover:rounded-lg p-1 "
							on:click|preventDefault={() => deletePosition(position)}
							title="Delete Position"><Delete /></button
						>
						<div class="relative">
							{#if position.freelancers.length > 0}
								<div class="flex items-center">
									<button
										class="bg-gray-300 dark:bg-gray-800  cursor-pointer hover:bg-blue-400 transition-all hover:rounded-lg p-1 "
										on:click|preventDefault={() =>
											(expand = expand === position.id ? '' : position.id)}
										title="Choose Freelancer"><ExpandMore /></button
									>
								</div>
							{/if}
							{#if expand === position.id}
								<div class="absolute top-5 bg-gray-300 dark:bg-gray-800 z-10">
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
						<span class="bg-gray-300 dark:bg-gray-800">Filled By You</span>
					{:else}
						<span class="bg-gray-300 dark:bg-gray-800">Filled By: {position?.filledBy?.name}</span>
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
				class="mt-5 bg-gray-300 dark:bg-gray-800 hover:bg-blue-400 hover:rounded-lg transition-all p-1"
				>Create Position</button
			>

			<input type="hidden" name="eventId" value={data.eventData.id} />
		{/if}

		<button formaction="?/updateEvent" class="hover:rounded-lg transition-all mt-4 bg-blue-400 px-4"
			>Save Changes</button
		>
		{#if data?.isManager}
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
