<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Skeleton } from '$lib/components/ui/skeleton';

	export let isLoading = false;
	export let attributes = [];
	export let confidenceLevel = 0;
	export let words = [];
</script>

<Card.Root class="mt-4">
	<Card.Header>
		<Card.Title>Mark Composition</Card.Title>
	</Card.Header>
	<Card.Content>
		{#if isLoading}
			<div class="space-y-2">
				<Skeleton class="w-full h-4" />
				<Skeleton class="w-full h-4" />
				<Skeleton class="w-full h-4" />
			</div>
		{:else}
			<div class="space-y-2">
				<div class="flex items-center">
					<span class="mr-2">&times;</span>
					<span>Confidence level: {confidenceLevel}%</span>
				</div>

				{#each attributes as attribute}
					<div class="flex items-center">
						<span class="mr-2">&times;</span>
						<span>{attribute}</span>
					</div>
				{/each}

				{#if words.length > 0}
					<div class="flex items-center">
						<span class="mr-2">&times;</span>
						<span>Words detected: {words.join(', ')}</span>
					</div>
				{/if}
			</div>
		{/if}
	</Card.Content>
</Card.Root>
