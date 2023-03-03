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

	<div class="portal-box">
		<a href="#" class="freelancer"><span>Freelancer Portal</span></a>
		<a href="#" class="manager"><span>Manager Portal</span></a>
	</div>
</section>

<style lang="scss">
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

	.portal-box {
		outline: 2px solid black;
		color: white;
		font-weight: bold;
		display: grid;
		grid-template-columns: 1fr 1fr;
		height: 10rem;
		text-align: center;
		overflow: hidden;
		font-size: 2rem;

		& > * {
			display: flex;
			align-items: center;
			justify-content: center;

			color: white;
			padding: 1rem;
			transition: all 250ms;
			position: relative;
			&:hover {
				text-decoration: none;
			}
		}

		.freelancer {
			background-color: var(--color-theme-1);

			&::before {
				transition: all 250ms;
				width: 0%;
				content: ' ';
				position: absolute;
				height: 100%;
				z-index: 1;
				background-color: var(--color-theme-1);
				margin-left: 100%;
			}
			&:hover {
				transition: all 250ms;
				&::before {
					content: ' ';
					width: 100%;
					margin-left: 200%;
					// z-index: 0;
					transition: all 250ms;
				}
			}
		}
		.manager {
			background-color: var(--color-theme-2);

			&::before {
				transition: all 250ms;
				width: 0%;
				content: ' ';
				position: absolute;
				height: 100%;
				z-index: 1;
				background-color: var(--color-theme-2);
				margin-right: 100%;
			}
			&:hover {
				transition: all 250ms;
				&::before {
					content: ' ';
					width: 100%;
					margin-right: 200%;
					// z-index: 0;
					transition: all 250ms;
				}
			}
		}
	}
</style>
