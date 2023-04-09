<script>
	import { page } from '$app/stores';
	import Profile from '$lib/images/profile.svelte';
	import Github from '$lib/images/github.svelte';
</script>

<header class="flex justify-between">
	<div class="h-10 w-10 hover:bg-blue-400 hover:text-white transition-all hover:rounded-br-lg">
		<a href="https://github.com/LaggySon/staffer"> <Github /></a>
	</div>
	<nav>
		<ul class="flex gap-1">
			<a href="/">
				<li
					class=" bg-gray-300 p-2 font-bold text-lg text-gray-700 hover:text-white hover:bg-red-400  transition-all hover:rounded-b-lg"
				>
					Staffer
				</li></a
			>
		</ul>
	</nav>
	<div class="h-10 w-10 p-1 hover:bg-blue-400 hover:text-white transition-all hover:rounded-bl-lg">
		<a href="/freelancer"><Profile /></a>
	</div>
</header>
