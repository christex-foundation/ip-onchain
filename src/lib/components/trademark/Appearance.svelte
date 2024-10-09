<script>
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { X } from 'lucide-svelte';
	import PrePopulatedZones from './PrePopulatedZones.svelte';
	import { appearanceStore } from '$lib/stores/trademarkStores';

	let newItem = '';

	function addItem() {
		if (newItem.trim()) {
			const items = newItem
				.split(',')
				.map((item) => item.trim())
				.filter((item) => item !== '');
			$appearanceStore.goodsAndServices = [...$appearanceStore.goodsAndServices, ...items];
			newItem = '';
		}
	}

	function removeItem(index) {
		$appearanceStore.goodsAndServices = $appearanceStore.goodsAndServices.filter(
			(_, i) => i !== index
		);
	}
</script>

<div class="container mx-auto p-4">
	<div class="overflow-hidden rounded-lg border bg-white pb-6">
		<div class="grid grid-cols-1 divide-y md:grid-cols-2 md:divide-x md:divide-y-0">
			<div class="p-6">
				<h2 class="mb-4 text-2xl font-semibold">
					Please enter goods and services your trademark will cover. Be as specific as possible.
				</h2>
				<p class="mb-4 text-sm text-gray-600">
					EXAMPLES: "T-SHIRTS, COFFEE, PHOTOS, ARTS, SOFTWARE"
				</p>

				<PrePopulatedZones />
			</div>

			<div class="p-6">
				<div>
					<Label for="service">Enter good or service</Label>
					<div class="flex gap-2">
						<Input id="service" type="text" bind:value={newItem} />
						<Button on:click={addItem}>Add Item</Button>
					</div>
				</div>

				<div class="mt-4">
					{#if $appearanceStore.goodsAndServices.length > 0}
						<h3 class="mb-2 text-lg font-semibold">Added Goods and Services:</h3>
					{/if}
					<ul class="space-y-2">
						{#each $appearanceStore.goodsAndServices as item, index}
							<li class="flex items-center justify-between rounded bg-gray-100 p-2">
								<span>{item}</span>
								<Button variant="ghost" size="sm" on:click={() => removeItem(index)}>
									<X class="h-4 w-4" />
								</Button>
							</li>
						{/each}
					</ul>
				</div>

				<div class="mt-16">
					<slot></slot>
				</div>
			</div>
		</div>
	</div>
</div>
