<script>
	import { createEventDispatcher } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Card from '$lib/components/ui/card';
	import Upload from 'lucide-svelte/icons/upload';
	import CirclePlus from 'lucide-svelte/icons/circle-plus';
	import { Skeleton } from '$lib/components/ui/skeleton';

	import { writable } from 'svelte/store';

	const MAX_IMAGES = 3;
	const PLACEHOLDER_IMAGE = '/images/placeholder.svg';

	const imageUrls = writable([PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE]);
	const dispatch = createEventDispatcher();

	async function handleFileUpload(event) {
		const input = /** @type {HTMLInputElement} */ (event.target);
		const files = Array.from(input.files || []);
		const imageFiles = files.filter((file) => file.type.startsWith('image/'));

		if (imageFiles.length === 0) {
			alert('Please select image files only.');
			return;
		}

		const newImages = await Promise.all(imageFiles.slice(0, MAX_IMAGES).map(readFileAsDataURL));

		imageUrls.update((urls) => {
			const updatedUrls = [...newImages, ...urls].slice(0, MAX_IMAGES);
			dispatch('imageUpload', { images: updatedUrls });
			return updatedUrls;
		});
	}

	function readFileAsDataURL(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (e) => resolve(/** @type {string} */ (e.target?.result));
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	}
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">Upload your mark</h1>
	<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
		<div>
			<Button variant="outline" class="mt-4 w-full">View pre-populated zones</Button>
		</div>
		<div>
			<Card.Root>
				<Card.Header>
					<Card.Title>Upload Image</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="mb-4">
						<img
							src={$imageUrls[0]}
							alt="Image preview"
							class="h-64 w-full rounded-lg object-cover"
						/>
					</div>
					<div class="grid grid-cols-5 gap-2">
						{#each $imageUrls.slice(1) as url, index}
							<img
								src={url}
								alt={`Thumbnail ${index + 1}`}
								class="h-16 w-full rounded-lg object-cover"
							/>
						{/each}
						<label
							class="flex h-16 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:bg-gray-50"
						>
							<input
								type="file"
								class="hidden"
								multiple
								on:change={handleFileUpload}
								accept="image/*"
							/>
							<Upload class="h-6 w-6 text-gray-400" />
						</label>
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title>Color Palette</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="grid grid-cols-3 gap-2">
						<div class="flex h-8 items-center justify-between rounded-md bg-[#FFFFFF] px-2">
							<span class="text-xs">#FFFFFF</span>
							<Button variant="ghost" size="icon" class="h-6 w-6 p-0">
								<span class="sr-only">Remove color</span>
								&times;
							</Button>
						</div>
						<div class="flex h-8 items-center justify-between rounded-md bg-[#000000] px-2">
							<span class="text-xs text-white">#000000</span>
							<Button variant="ghost" size="icon" class="h-6 w-6 p-0 text-white">
								<span class="sr-only">Remove color</span>
								&times;
							</Button>
						</div>
						<div class="flex h-8 items-center justify-between rounded-md bg-[#FF0000] px-2">
							<span class="text-xs text-white">#FF0000</span>
							<Button variant="ghost" size="icon" class="h-6 w-6 p-0 text-white">
								<span class="sr-only">Remove color</span>
								&times;
							</Button>
						</div>
					</div>
				</Card.Content>
			</Card.Root>
			<Card.Root class="mt-4">
				<Card.Header>
					<Card.Title>Mark Composition</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="space-y-2">
						<div class="flex items-center">
							<span class="mr-2">&times;</span>
							<span>3D Mark detection</span>
						</div>
						<div class="flex items-center">
							<span class="mr-2">&times;</span>
							<span>Multiple logo variations</span>
						</div>
						<div class="flex items-center">
							<span class="mr-2">&times;</span>
							<span>Format type for your mark is an image</span>
						</div>
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</div>
