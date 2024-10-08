<script>
	import IPListHeader from './IPListHeader.svelte';
	import IPListItem from './IPListItem.svelte';

	const ipItems = [
		{ name: 'San Siran Act', registration: 'REG-2345690', status: 'Approved', type: 'COPYRIGHT' },
		{ name: 'Korpor Don', registration: 'REG-2345679', status: 'REJECTED', type: 'TRADEMARK' },
		{ name: 'Dry Res', registration: 'REG-2345694', status: 'In Review', type: 'TRADEMARK' },
		{ name: 'Bomba Browsing', registration: 'REG-2345692', status: 'Approved', type: 'COPYRIGHT' },
		{
			name: 'Radar Hackathon',
			registration: 'REG-2345695',
			status: 'In Review',
			type: 'TRADEMARK'
		},
		{ name: 'Wah Dis', registration: 'REG-2345340', status: 'Approved', type: 'COPYRIGHT' },
		{ name: 'Mega Cola', registration: 'REG-2342370', status: 'In Review', type: 'TRADEMARK' },
		{ name: 'Bintou', registration: 'REG-2347460', status: 'REJECTED', type: 'COPYRIGHT' },
		{ name: 'CyPa', registration: 'REG-2343580', status: 'Approved', type: 'TRADEMARK' },
		{ name: 'Skoot Skoot', registration: 'REG-2342460', status: 'REJECTED', type: 'COPYRIGHT' }
	];
</script>

<main
	class="flex flex-col justify-end overflow-hidden rounded-lg border-[5px] border-solid border-gray-200 bg-white font-bold"
>
	<IPListHeader />
	<section class="flex flex-col w-full text-base leading-none text-zinc-800 max-md:max-w-full">
		{#each ipItems as item}
			<IPListItem {...item} />
		{/each}
		<div
			class="flex min-h-[8px] w-full gap-10 border-b-[0.5px] border-solid border-b-stone-300 py-4 max-md:max-w-full"
		/>
	</section>
</main>

<style>
	:global(builder-component) {
		max-width: none !important;
	}
</style>
