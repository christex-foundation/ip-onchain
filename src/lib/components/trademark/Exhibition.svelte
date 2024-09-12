<script>
	import { createEventDispatcher } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Card from '$lib/components/ui/card';
	import Upload from 'lucide-svelte/icons/upload';
	import CirclePlus from 'lucide-svelte/icons/circle-plus';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';

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
			<Card.Root>
				<Card.Header>
					<Card.Title>Upload Your Trademark Image</Card.Title>
				</Card.Header>
				<Card.Content>
					<p class="mb-4">
						This is the first step in registering your trademark. Here, you'll upload a high-quality
						image of your mark. Our AI will analyze the image to detect colors, composition, and
						format.
					</p>

					<h3 class="mb-2 font-semibold">Guidelines:</h3>
					<ul class="mb-4 list-inside list-disc">
						<li>Upload a clear, high-resolution image</li>
						<li>Ensure the image accurately represents your trademark</li>
						<li>Supported formats: PNG, JPG, SVG (max 5MB)</li>
					</ul>

					<p class="mb-4">
						After uploading, you'll see a color palette and mark composition analysis. This
						information helps ensure your trademark is unique and properly categorized. You can
						upload up to 5 variations if needed.
					</p>

					<p class="mb-4">
						Review the AI-detected information carefully. If anything seems incorrect, you'll have a
						chance to make adjustments in the next steps.
					</p>
				</Card.Content>
			</Card.Root>

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
