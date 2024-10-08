<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let searchQuery = '';

	function handleSearch() {
		dispatch('search', searchQuery);
	}
</script>

<form on:submit|preventDefault={handleSearch} class="flex items-center gap-3 max-md:max-w-full">
	<label for="searchInput" class="sr-only">Search for IP</label>
	<div
		class="my-auto flex min-h-[32px] min-w-[240px] items-center justify-center gap-3 self-stretch rounded-lg border border-solid border-gray-400 bg-white px-4 py-2 text-gray-400"
	>
		<img
			loading="lazy"
			src="https://cdn.builder.io/api/v1/image/assets/TEMP/ce77e02dcdc04008164d7f3eab65d9daeacbe9c78eb4a89cea4577d29c9ca411?placeholderIfAbsent=true&apiKey=6ca8f0f1c7fe470ca83ea0278d1f163e"
			alt=""
			class="self-stretch object-contain w-4 my-auto aspect-square shrink-0"
		/>
		<input
			type="text"
			id="searchInput"
			bind:value={searchQuery}
			placeholder="Search for IP"
			class="self-stretch my-auto bg-transparent border-none outline-none w-72"
		/>
	</div>
	<button
		type="submit"
		class="my-auto min-h-[32px] gap-2 self-stretch whitespace-nowrap rounded-md bg-black px-3 py-2 font-bold text-white"
	>
		Search
	</button>
</form>
