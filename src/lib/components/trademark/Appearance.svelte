<script>
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
	import {
		Select,
		SelectTrigger,
		SelectValue,
		SelectContent,
		SelectItem
	} from '$lib/components/ui/select';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import * as Popover from '$lib/components/ui/popover';
	import { Calendar } from '$lib/components/ui/calendar';
	import { X, Plus, Eye } from 'lucide-svelte';
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import { DateFormatter, getLocalTimeZone } from '@internationalized/date';
	import { cn } from '$lib/utils';
	import PrePopulatedZones from './PrePopulatedZones.svelte';

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	let filings = ['123457abcded', '123457abcded', '123457abcded'];

	let value = undefined;
	let files = ['123457abcded', '123457abcded', '123457abcded'];

	// New code for handling goods and services
	let goodsAndServices = [];
	let newItem = '';

	function addItem() {
		if (newItem.trim()) {
			const items = newItem
				.split(',')
				.map((item) => item.trim())
				.filter((item) => item !== '');
			goodsAndServices = [...goodsAndServices, ...items];
			newItem = '';
		}
	}

	function removeItem(index) {
		goodsAndServices = goodsAndServices.filter((_, i) => i !== index);
	}

	function removeFiling(index) {
		filings = filings.filter((_, i) => i !== index);
	}
</script>

<div class="container p-4 mx-auto">
	<div class="pb-6 overflow-hidden bg-white border rounded-lg">
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
					<h3 class="mb-2 text-lg font-semibold">Added Goods and Services:</h3>
					<ul class="space-y-2">
						{#each goodsAndServices as item, index}
							<li class="flex items-center justify-between p-2 bg-gray-100 rounded">
								<span>{item}</span>
								<Button variant="ghost" size="sm" on:click={() => removeItem(index)}>
									<X class="w-4 h-4" />
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
