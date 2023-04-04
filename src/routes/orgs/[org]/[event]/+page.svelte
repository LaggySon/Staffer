<script lang="ts">
	import type { Position } from '@prisma/client';
	export let data;

	const positions = data?.eventData?.positions as Position[];
</script>

<h1>{data?.eventData?.name}</h1>
<p>{data?.eventData?.location}</p>
<p>{data?.eventData?.date}</p>

{#each positions as position}
	<p>
		{position.title} - {position.compensation} - {position.filledBy
			? position.filledBy.name
			: 'NOT FILLED'}
	</p>
{/each}
