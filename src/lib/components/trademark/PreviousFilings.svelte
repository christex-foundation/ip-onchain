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

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	let filings = ['123457abcded', '123457abcded', '123457abcded'];

	let value = undefined;
	let files = ['123457abcded', '123457abcded', '123457abcded'];

	function addFiling() {
		filings = [...filings, '123457abcded'];
	}

	function removeFiling(index) {
		filings = filings.filter((_, i) => i !== index);
	}
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">Upload your mark</h1>
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
		<div>
			<h2 class="mb-4 text-2xl font-semibold">
				Have you already file for this mark in another country within the last six (6)months?
			</h2>
			<RadioGroup>
				<div class="flex items-center space-x-2">
					<RadioGroupItem value="yes" id="yes" />
					<Label for="yes">YES</Label>
				</div>
				<div class="flex items-center space-x-2">
					<RadioGroupItem value="no" id="no" />
					<Label for="no">NO</Label>
				</div>
			</RadioGroup>

			<Collapsible.Root class="w-full space-y-2">
				<Collapsible.Trigger asChild let:builder>
					<Button builders={[builder]} variant="outline" class="mt-4 w-full">
						View pre-populated zones
					</Button>
				</Collapsible.Trigger>
				<Collapsible.Content class="space-y-2">
					<div class="rounded-md border px-4 py-3 font-mono text-sm">@huntabyte/bits-ui</div>
					<div class="rounded-md border px-4 py-3 font-mono text-sm">@melt-ui/melt-ui</div>
					<div class="rounded-md border px-4 py-3 font-mono text-sm">@sveltejs/svelte</div>
				</Collapsible.Content>
			</Collapsible.Root>
		</div>

		<div class="space-y-4">
			<div>
				<Label for="country">Country</Label>
				<Select>
					<SelectTrigger id="country">
						<SelectValue placeholder="Choose country" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="us">United States</SelectItem>
						<SelectItem value="uk">United Kingdom</SelectItem>
						<!-- Add more countries as needed -->
					</SelectContent>
				</Select>
			</div>

			<div>
				<Label for="date">Date</Label>
				<Popover.Root>
					<Popover.Trigger asChild let:builder>
						<Button
							variant="outline"
							class={cn(
								'w-full justify-start text-left font-normal',
								!value && 'text-muted-foreground'
							)}
							builders={[builder]}
						>
							<CalendarIcon class="mr-2 h-4 w-4" />
							{value ? df.format(value.toDate(getLocalTimeZone())) : 'MM/DD/YYYY'}
						</Button>
					</Popover.Trigger>
					<Popover.Content class="w-auto p-0">
						<Calendar bind:value initialFocus />
					</Popover.Content>
				</Popover.Root>
			</div>

			<div>
				<Label for="application">Application # of earliest filing</Label>
				<Input id="application" type="text" />
			</div>

			<div>
				<p class="mb-2 text-sm text-gray-600">You can add multiple dates of filing</p>
				<Button on:click={addFiling}>Add filing +</Button>
			</div>

			<div class="space-y-2">
				{#each filings as filing, index}
					<div class="flex items-center justify-between rounded bg-gray-100 p-2">
						<span>File #{filing}</span>
						<Button variant="ghost" size="icon" on:click={() => removeFiling(index)}>
							<X class="h-4 w-4" />
						</Button>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
