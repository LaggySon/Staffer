<script>
	let word = '';
	$: reverse = word.split('').reverse().join('');
</script>

<svelte:head>
	<title>Staffer</title>
	<meta name="description" content="Efficient and effective event staffing" />
</svelte:head>

<section>
	<h1>Welcome to Staffer!</h1>
	<span
		>If you found this, congratulations! We're currently in early development and have no working
		functionality.</span
	>
	<span
		>So I guess just hang out here and refresh the page every once in a while, I'm sure something
		will show up eventually :)</span
	>
	<input style="text-align:center;" type="text" bind:value={word} placeholder="reverse some text" />
	<p id="reversed-text">{reverse}</p>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	span {
		padding-block: 0.5rem;
	}
	input[type='text'] {
		margin-top: 1rem;
		border: none;
		border-bottom: 1px solid var(--color-text);
		background-color: transparent;
		color: var(--color-theme-1);
	}
	input[type='text']:focus {
		border: none;
		border-bottom: 1px solid var(--color-text);
		outline: none;
	}
	#reversed-text {
		height: 1em;
		color: var(--color-theme-2);
	}
</style>
