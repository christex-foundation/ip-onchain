<script>
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import Upload from 'lucide-svelte/icons/upload';

	export let imageUrls = [];
	export let handleFileUpload;
</script>

<Card.Root class="border-none shadow-none">
	<Card.Header>
		<Card.Title>Mark upload</Card.Title>
	</Card.Header>
	<Card.Content>
		<div class="mb-4">
			<img src={imageUrls?.[0]} alt="Image preview" class="object-cover w-full h-64 rounded-lg" />
		</div>
		<div class="grid grid-cols-5 gap-2">
			{#each imageUrls?.slice(1) as url, index}
				<img src={url} alt={`Thumbnail ${index + 1}`} class="object-cover w-full h-16 rounded-lg" />
			{/each}
			<label
				class="flex items-center justify-center w-full h-16 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
			>
				<input type="file" class="hidden" multiple on:change={handleFileUpload} accept="image/*" />
				<Upload class="w-6 h-6 text-gray-400" />
			</label>
		</div>
	</Card.Content>
</Card.Root>
