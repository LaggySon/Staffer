<script lang="ts">
	let orgs = ['Organization 1', 'Organization 2', 'Organization b'];
	let session = false;
	let joinCode = '';

	function login() {
		session = !session;
	}

	function joinOrg() {
		orgs = [...orgs, joinCode];
		joinCode = '';
	}
</script>

<h1 class="text-center text-3xl">Welcome, Freelancer!</h1>
<p class="text-center">Here you can...</p>
<ul class="text-center my-auto">
	<li class="m-4">
		<form action="post">
			<label class="text-lg" for="orgcode">Join an Organization</label>
			<br />
			<input
				class="bg-transparent border"
				type="text"
				name="orgcode"
				id="orgcode"
				bind:value={joinCode}
			/>
			<br />
			<button class="bg-transparent border p-2 m-2" on:click|preventDefault={joinOrg}>Join</button>
		</form>
	</li>
	{#if !session}
		<li class="m-4">
			<button on:click|preventDefault={login} class="bg-blue-400 p-2">Log In</button>
		</li>
		<li class="m-4">
			<button class="bg-red-400 p-2">Sign up</button>
		</li>
	{:else}
		<p>Go to...</p>
		<ul>
			{#each orgs as org}
				<li class="bg-blue-400 p-2 m-2 max-w-lg mx-auto"><a href="/events">{org}</a></li>
			{/each}
			<li class="m-4">
				<button on:click|preventDefault={login} class="bg-red-400 p-2">Log Out</button>
			</li>
		</ul>
	{/if}
</ul>
