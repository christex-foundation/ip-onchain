<script>
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Skeleton } from '$lib/components/ui/skeleton';

	export let isLoading = false;
	export let colors = [];
</script>

<Card.Root class="mt-4">
	<Card.Header>
		<Card.Title>Color Palette</Card.Title>
	</Card.Header>
	<Card.Content>
		{#if isLoading}
			<div class="grid grid-cols-3 gap-2">
				<div class="flex h-8 items-center justify-between rounded-md px-2">
					<Skeleton class="h-6 w-12" />
					<Skeleton class="h-6 w-6" />
				</div>
				<div class="flex h-8 items-center justify-between rounded-md px-2">
					<Skeleton class="h-6 w-12" />
					<Skeleton class="h-6 w-6" />
				</div>
				<div class="flex h-8 items-center justify-between rounded-md px-2">
					<Skeleton class="h-6 w-12" />
					<Skeleton class="h-6 w-6" />
				</div>
			</div>
		{:else}
			<div class="grid grid-cols-3 gap-2">
				{#each colors as color}
					<div class="flex h-8 items-center justify-between rounded-md bg-[{color}] px-2">
						<span class="text-xs">{color}</span>
						<Button variant="ghost" size="icon" class="h-6 w-6 p-0">
							<span class="sr-only">Remove color</span>
							&times;
						</Button>
					</div>
				{/each}
			</div>
		{/if}
	</Card.Content>
</Card.Root>
