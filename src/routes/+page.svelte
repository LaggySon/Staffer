<script>
	let word = '';
	$: reverse = word.split('').reverse().join('');
</script>

<svelte:head>
	<title>Staffer</title>
	<meta name="description" content="Efficient and effective event staffing" />
</svelte:head>

<body class="text-center my-auto">
	<h1 class="text-3xl lg:text-7xl  transition-all text-center mb-4">Welcome to Staffer!</h1>
	<!-- <div class="my-20">
		<p>
			If you found this, congratulations! We're currently in early development and have no working
			functionality.
		</p>
		<p>
			So I guess just hang out here and refresh the page every once in a while, I'm sure something
			will show up eventually :)
		</p>
	</div>
	<input
		class="text-center w-full text-blue-400 focus-within:outline-transparent border-solid border-b-black outline-transparent outline-none"
		type="text"
		bind:value={word}
		placeholder="reverse some text"
	/>
	<p class="h-[1em] text-red-400">{reverse}</p> -->
	<p class="text-lg lg:text-3xl">I am a...</p>

	<div class="portal-box  lg:text-3xl text-xl">
		<a href="/freelancer" class="freelancer bg-blue-400 before:bg-blue-400"
			><span>Freelancer</span></a
		>
		<a href="/manager" class="manager  bg-red-400 before:bg-red-400"><span>Manager</span></a>
	</div>

	<div class=" my-20 transition-all">
		<p class="text-xl lg:text-3xl font-bold">Say Goodbye To</p>
		<ul class="lg:text-xl">
			<li>Disorganized Spreadsheets</li>
			<li>Double Bookings</li>
			<li>No-Call No-Shows</li>
		</ul>
	</div>
</body>

<style lang="scss">
	.portal-box {
		outline: 2px solid black;
		color: white;
		font-weight: bold;
		display: grid;
		grid-template-columns: 1fr 1fr;
		height: 10rem;
		text-align: center;
		overflow: hidden;
		// font-size: 2rem;

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
			&::before {
				transition: all 250ms;
				width: 0%;
				content: ' ';
				position: absolute;
				height: 100%;
				z-index: 1;
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
			&::before {
				transition: all 250ms;
				width: 0%;
				content: ' ';
				position: absolute;
				height: 100%;
				z-index: 1;
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
