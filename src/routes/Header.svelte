<script>
	import { page } from '$app/stores';
	import Profile from '$lib/images/profile.svelte';
	import Github from '$lib/images/github.svelte';
</script>

<header class="flex justify-between">
	<div class="h-10 w-10 hover:bg-red-400 hover:text-white transition-all hover:rounded-br-lg">
		<Github />
	</div>
	<nav>
		<ul class="flex gap-1">
			<li
				class=" bg-gray-300 p-2 font-bold text-lg text-gray-700 hover:bg-blue-400 hover:text-white transition-all hover:rounded-b-lg"
			>
				<a href="/">Staffer</a>
			</li>
		</ul>
	</nav>
	<div class="h-10 w-10 p-1 hover:bg-red-400 hover:text-white transition-all hover:rounded-bl-lg">
		<Profile />
	</div>
</header>
