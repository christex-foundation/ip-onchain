<script>
	import RevenueGenerated from './RevenueGenerated.svelte';
	import ActiveLicenses from './ActiveLicenses.svelte';
</script>

<section class="flex flex-col">
	<h2 class="text-xs font-bold leading-none text-stone-400">QUICK STATS</h2>
	<div
		class="mt-2 w-full overflow-hidden rounded-lg border border-solid border-black bg-white pb-16 pl-3 pr-20 pt-3 shadow-[0px_1px_4px_rgba(0,0,0,0.25)]"
	>
		<div class="flex gap-5 max-md:flex-col">
			<RevenueGenerated />
			<ActiveLicenses />
		</div>
	</div>
</section>
