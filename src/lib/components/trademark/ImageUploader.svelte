<script>
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import Upload from 'lucide-svelte/icons/upload';

	export let imageUrls = [];
	export let handleFileUpload;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Upload Image</Card.Title>
	</Card.Header>
	<Card.Content>
		<div class="mb-4">
			<img src={imageUrls?.[0]} alt="Image preview" class="h-64 w-full rounded-lg object-cover" />
		</div>
		<div class="grid grid-cols-5 gap-2">
			{#each imageUrls?.slice(1) as url, index}
				<img src={url} alt={`Thumbnail ${index + 1}`} class="h-16 w-full rounded-lg object-cover" />
			{/each}
			<label
				class="flex h-16 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:bg-gray-50"
			>
				<input type="file" class="hidden" multiple on:change={handleFileUpload} accept="image/*" />
				<Upload class="h-6 w-6 text-gray-400" />
			</label>
		</div>
	</Card.Content>
</Card.Root>
