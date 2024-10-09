<script>
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
	import { uploadStore } from '$lib/stores/trademarkStores';

	let isLoading = writable(false);
	let isDataLoaded = writable(false);

	$: if ($uploadStore.images.length === 0) {
		$uploadStore.images = [PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE];
	}

	async function handleFileUpload(event) {
		const input = event.target;
		const files = Array.from(input.files || []);
		const imageFiles = files.filter((file) => file.type.startsWith('image/'));

		if (imageFiles.length === 0) {
			alert('Please select image files only.');
			return;
		}

		const newImages = await Promise.all(imageFiles.slice(0, MAX_IMAGES).map(readFileAsDataURL));

		$uploadStore.images = [...newImages, ...$uploadStore.images].slice(0, MAX_IMAGES);

		await processImages(newImages);
	}

	async function processImages(images) {
		isLoading.set(true);
		try {
			const result = await sendImagesToVisionEndpoint(images);

			if (!result.success) {
				throw new Error(result.error);
			}

			uploadStore.set({ ...$uploadStore, visionData: result });
			isDataLoaded.set(true);
		} catch (error) {
			console.error('Error processing images:', error);
			uploadStore.set({ ...$uploadStore, visionData: { error: error.message } });
		} finally {
			isLoading.set(false);
		}
	}
</script>

<div class="container mx-auto">
	{#if $uploadStore.visionData.error}
		<Alert.Root variant="destructive" class="mt-4">
			<CircleAlert class="w-4 h-4" />
			<Alert.Title>Error</Alert.Title>
			<Alert.Description>{$uploadStore.visionData.error}</Alert.Description>
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
				<ImageUploader imageUrls={$uploadStore.images} {handleFileUpload} />

				{#if $isLoading}
					<ColorPalette isLoading={true} />
					<MarkComposition isLoading={true} />
				{:else if $isDataLoaded}
					<ColorPalette colors={$uploadStore.visionData.dominantColours} />
					<MarkComposition
						attributes={$uploadStore.visionData.attributes}
						confidenceLevel={$uploadStore.visionData.confidenceLevel}
						words={$uploadStore.visionData.words}
					/>
				{/if}

				<div class="p-6">
					<slot></slot>
				</div>
			</div>
		</div>
	</div>
</div>
