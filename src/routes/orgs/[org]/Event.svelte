<script lang="ts">
	import dayjs from 'dayjs';
	import timezone from 'dayjs/plugin/timezone';
	import advancedFormat from 'dayjs/plugin/advancedFormat';

	dayjs.extend(timezone);
	dayjs.extend(advancedFormat);

	export let location: string;
	export let name: string;
	export let date: string;
</script>

<div
	class="grid grid-cols-3  bg-gray-300 dark:bg-gray-800  cursor-pointer transition-all overflow-hidden before:w-0 before:bg-blue-400 before:absolute hover:before:w-full before:h-10 before:transition-all before:duration-300 before:left-1/2 hover:before:left-0"
>
	<span class=" h-10 flex items-center justify-center "><span class="z-10">{location}</span></span>
	<span class=" h-10 flex items-center justify-center "><span class="z-10">{name}</span></span>
	<span class=" h-10 flex items-center justify-center ">
		<span class="z-10">{dayjs(date).format('MM-DD-YYYY @ HH:mm z')}</span>
	</span>
</div>
