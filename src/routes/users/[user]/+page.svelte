<script lang="ts">
	export let data;

	console.log(data?.user?.email);
</script>

<div class="mx-auto text-center flex justify-center items-center flex-col">
	<div class="w-32 h-32"><img src={data?.user?.image} alt="" /></div>
	<div class="text-2xl">{data?.user?.name}</div>
</div>
