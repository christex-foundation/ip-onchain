<script>
	import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';
	import { MAX_IMAGES, PLACEHOLDER_IMAGE } from '$lib/constants';
	import { readFileAsDataURL, sendImagesToVisionEndpoint } from '$lib/utils';
	import ImageUploader from './ImageUploader.svelte';
	import ColorPalette from './ColorPalette.svelte';
	import MarkComposition from './MarkComposition.svelte';
	import GuidelinesCard from './GuidelinesCard.svelte';
	import PrePopulatedZones from './PrePopulatedZones.svelte';
	import * as Alert from '$lib/components/ui/alert';
	import CircleAlert from 'lucide-svelte/icons/circle-alert';

	const dispatch = createEventDispatcher();
	const imageUrls = writable([PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE]);

	let visionData = writable({
		dominantColours: [],
		attributes: [],
		confidenceLevel: 0,
		words: [],
		error: null
	});
	let isLoading = writable(false);
	let isDataLoaded = writable(false);

	async function handleFileUpload(event) {
		const input = event.target;
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

		await processImages(newImages);
	}

	async function processImages(images) {
		isLoading.set(true);
		try {
			const result = await sendImagesToVisionEndpoint(images);

			if (!result.success) {
				throw new Error(result.error);
			}

			visionData.set(result);
			isDataLoaded.set(true);
		} catch (error) {
			console.error('Error processing images:', error);
			visionData.set({ error });
		} finally {
			isLoading.set(false);
		}
	}
</script>

<div class="container mx-auto">
	{#if $visionData.error}
		<Alert.Root variant="destructive" class="mt-4">
			<CircleAlert class="w-4 h-4" />
			<Alert.Title>Error</Alert.Title>
			<Alert.Description>{$visionData.error}</Alert.Description>
		</Alert.Root>
	{/if}

	<div class="pb-6 overflow-hidden bg-white border rounded-lg">
		<div class="grid grid-cols-1 divide-y md:grid-cols-2 md:divide-x md:divide-y-0">
			<div>
				<GuidelinesCard />
				<div class="ml-6">
					<PrePopulatedZones />
				</div>
			</div>

			<div>
				<ImageUploader imageUrls={$imageUrls} {handleFileUpload} />

				{#if $isLoading}
					<ColorPalette isLoading={true} />
					<MarkComposition isLoading={true} />
				{:else if $isDataLoaded}
					<ColorPalette colors={$visionData.dominantColours} />
					<MarkComposition
						attributes={$visionData.attributes}
						confidenceLevel={$visionData.confidenceLevel}
						words={$visionData.words}
					/>
				{/if}

				<div class="p-6">
					<slot></slot>
				</div>
			</div>
		</div>
	</div>
</div>
