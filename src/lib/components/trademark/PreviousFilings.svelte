<script>
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
	import {
		Select,
		SelectTrigger,
		SelectValue,
		SelectContent,
		SelectItem
	} from '$lib/components/ui/select';
	import * as Popover from '$lib/components/ui/popover';
	import { Calendar } from '$lib/components/ui/calendar';
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import { DateFormatter, getLocalTimeZone } from '@internationalized/date';
	import { cn } from '$lib/utils';
	import PrePopulatedZones from './PrePopulatedZones.svelte';

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	/** @type {import('@internationalized/date').CalendarDate | undefined} */
	let value;

	/** @type {'yes' | 'no' | undefined} */
	let radioValue;
</script>

<div class="container p-4 mx-auto">
	<div class="pb-6 overflow-hidden bg-white border rounded-lg">
		<div class="grid grid-cols-1 gap-6 divide-y md:grid-cols-2 md:divide-x md:divide-y-0">
			<div class="p-6">
				<h2 class="mb-4 text-2xl font-semibold">
					Have you already filed for this mark in another country within the last six (6) months?
				</h2>
				<RadioGroup bind:value={radioValue}>
					<div class="flex items-center space-x-2">
						<RadioGroupItem value="yes" id="yes" />
						<Label for="yes">YES</Label>
					</div>
					<div class="flex items-center space-x-2">
						<RadioGroupItem value="no" id="no" />
						<Label for="no">NO</Label>
					</div>
				</RadioGroup>

				<PrePopulatedZones />
			</div>

			<div class="p-6">
				{#if radioValue === 'yes'}
					<div class="hide-me">
						<div>
							<Label for="country">Country</Label>
							<Select>
								<SelectTrigger id="country">
									<SelectValue placeholder="Choose country" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="us">United States</SelectItem>
									<SelectItem value="uk">United Kingdom</SelectItem>
									<SelectItem value="af">Afghanistan</SelectItem>
									<SelectItem value="al">Albania</SelectItem>
									<SelectItem value="dz">Algeria</SelectItem>
									<SelectItem value="as">American Samoa</SelectItem>
									<SelectItem value="ad">Andorra</SelectItem>
									<SelectItem value="ao">Angola</SelectItem>
									<SelectItem value="ai">Anguilla</SelectItem>
									<SelectItem value="aq">Antarctica</SelectItem>
									<SelectItem value="ag">Antigua and Barbuda</SelectItem>
									<SelectItem value="ar">Argentina</SelectItem>
									<SelectItem value="am">Armenia</SelectItem>
									<SelectItem value="aw">Aruba</SelectItem>
									<SelectItem value="au">Australia</SelectItem>
									<SelectItem value="at">Austria</SelectItem>

									<!-- Add more countries as needed -->
								</SelectContent>
							</Select>
						</div>

						<div class="mt-4">
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
										<CalendarIcon class="w-4 h-4 mr-2" />
										{value ? df.format(value.toDate(getLocalTimeZone())) : 'MM/DD/YYYY'}
									</Button>
								</Popover.Trigger>
								<Popover.Content class="w-auto p-0">
									<Calendar bind:value initialFocus />
								</Popover.Content>
							</Popover.Root>
						</div>
					</div>
				{/if}
				<div class="mt-16">
					<slot></slot>
				</div>
			</div>
		</div>
	</div>
</div>
