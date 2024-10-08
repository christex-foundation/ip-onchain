<script>
	import IPInfo from './IPInfo.svelte';
	import IPStatusBadge from './IPStatusBadge.svelte';
</script>

<section class="flex flex-col">
	<h2 class="text-xs font-bold leading-none text-stone-400">IP DETAILS</h2>
	<article
		class="mt-2 w-full overflow-hidden rounded-lg border border-solid border-black bg-white pb-5 pl-3 pr-12 pt-3 shadow-[0px_1px_4px_rgba(0,0,0,0.25)]"
	>
		<div class="flex gap-5 max-md:flex-col">
			<IPInfo />
			<div class="ml-5 flex w-[42%] flex-col max-md:ml-0 max-md:w-full">
				<div class="flex flex-col items-start font-bold">
					<div class="flex flex-col">
						<h3 class="text-xs leading-none tracking-wider uppercase text-stone-300">IP type</h3>
						<p class="mt-1 text-base leading-none text-stone-900">Trademark</p>
					</div>
					<div class="flex flex-col mt-5 leading-none uppercase">
						<h3 class="text-xs tracking-wider text-stone-300">Status</h3>
						<IPStatusBadge status="In Review" />
					</div>
					<div class="flex flex-col mt-6">
						<h3 class="text-xs leading-none tracking-wider uppercase text-stone-300">
							Approval date
						</h3>
						<p class="mt-1 text-base leading-none text-stone-900">NA</p>
					</div>
					<div class="flex flex-col self-stretch mt-4">
						<h3 class="text-xs leading-none tracking-wider uppercase text-stone-300">
							TRADEMARK CLASS
						</h3>
						<p class="mt-1 text-base leading-none text-stone-900">CLASS 42</p>
					</div>
				</div>
			</div>
		</div>
	</article>
</section>
