<script>
	import StatsItem from '$lib/components/dashboard/StatsItem.svelte';
	import SearchBar from '$lib/components/dashboard/SearchBar.svelte';
	import ActionButtons from '$lib/components/dashboard/ActionButtonGroup.svelte';
	import IPList from '$lib/components/dashboard/IPList.svelte';
	import IPDetails from '$lib/components/dashboard/IPDetails.svelte';
	import QuickStats from '@/components/dashboard/QuickStats.svelte';
	const stats = [
		{ label: 'Total filings', value: '10', color: 'orange-300' },
		{ label: 'Filings In Review', value: '4', color: 'orange-400' },
		{ label: 'Filings Approved', value: '4', color: 'green-400' },
		{ label: 'Filings rejected', value: '2', color: 'red-500' },
		{ label: 'Royalties', value: 'SLL 45K', color: 'sky-500' },
		{ label: 'Infringements', value: '2', color: 'violet-700' }
	];
</script>

<main class="bg-white">
	<section class="flex flex-col p-6 overflow-hidden border-b border-solid border-b-gray-200">
		<h2 class="self-start text-sm font-bold leading-none tracking-wider text-gray-400 uppercase">
			Overview Stats
		</h2>
		<div class="mt-3.5 flex w-full flex-wrap">
			{#each stats as stat}
				<div class="min-w-[150px] flex-1 p-2">
					<StatsItem {...stat} />
				</div>
			{/each}
		</div>
	</section>

	<header
		class="flex flex-wrap justify-between gap-10 overflow-hidden border-b border-solid border-b-gray-200 bg-white px-7 py-3.5 text-xs leading-none max-md:px-5"
	>
		<SearchBar />
		<ActionButtons />
	</header>

	<div class="flex flex-col p-6">
		<div class="flex gap-[30px]">
			<div class="flex-1">
				<IPList />
			</div>
			<div class="flex-1 rounded-lg border-[5px] border-solid border-gray-200 p-6">
				<IPDetails />

				<div class="mt-4">
					<QuickStats />
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	:global(builder-component) {
		max-width: none !important;
	}
</style>
