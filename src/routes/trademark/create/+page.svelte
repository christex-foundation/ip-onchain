<script>
	import { cubicInOut } from 'svelte/easing';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { currentStep, completedSteps, clearTrademarkStepsStores } from '@/stores/trademarkSteps';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog';
	import TrademarkStepper from '$lib/components/trademark/TrademarkStepper.svelte';
	import Upload from '@/components/trademark/Upload.svelte';
	import Filings from '@/components/trademark/PreviousFilings.svelte';
	import Appearance from '@/components/trademark/Appearance.svelte';
	import {
		uploadStore,
		filingsStore,
		appearanceStore,
		clearTrademarkStores
	} from '$lib/stores/trademarkStores';
	import { Alert } from '@/components/ui/alert';

	const steps = [
		{ component: Upload, path: 'upload', title: 'Upload' },
		{ component: Filings, path: 'previous-filings', title: 'Previous Filings' },
		{ component: Appearance, path: 'appearance', title: 'Appearance' }
	];

	$: currentPath = $page.params.step || steps[0].path;
	$: CurrentComponent =
		steps.find((step) => step.path === currentPath)?.component || steps[0].component;
	$: currentStepIndex = steps.findIndex((step) => step.path === currentPath);

	let showDialog = false;
	let submissionError = null;

	function handleFinish() {
		showDialog = true;
	}

	async function handleSubmitApplication() {
		try {
			const response = await fetch('/api/trademark/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					ipData: {
						name: 'Trademark Superteam Logo',
						type: 'Trademark',
						upload: {
							images: $uploadStore.images,
							visionData: $uploadStore.visionData
						},
						filings: {
							hasPreviousFiling: $filingsStore.radioValue === 'yes',
							country: $filingsStore.country?.label,
							date: $filingsStore.date
						},
						appearance: {
							goodsAndServices: $appearanceStore.goodsAndServices
						}
					}
				})
			});

			if (!response.ok) {
				throw new Error('Failed to submit trademark application');
			}

			const result = await response.json();
			console.log('Trademark application submitted successfully:', result);
			window.location = result.redirectUrl;

			clearTrademarkStores();
			clearTrademarkStepsStores();
			showDialog = false;
		} catch (error) {
			console.error('Error submitting trademark application:', error);
			submissionError = error.message;
		}
	}

	function nextStep() {
		$completedSteps = [...$completedSteps, $currentStep];
		$currentStep = ($currentStep + 1) % steps.length;
		goto(`/trademark/create/${steps[$currentStep].path}`);
	}

	function goToStep(index) {
		if (index <= $currentStep) {
			$currentStep = index;
			goto(`/trademark/create/${steps[index].path}`);
		}
	}

	function smoothTransition(node, { delay = 0, duration = 400 }) {
		const existingTransform = getComputedStyle(node).transform.replace('none', '');

		return {
			delay,
			duration,
			css: (t) => {
				const eased = cubicInOut(t);
				return `
					opacity: ${eased};
					transform: ${existingTransform} translate3d(0, ${(1 - eased) * 20}px, 0);
				`;
			}
		};
	}
</script>

<main class="flex h-screen overflow-hidden">
	<div class="w-64 p-4 border-gray-200 dark:border-gray-700">
		<TrademarkStepper {steps} {currentStepIndex} {goToStep} />
	</div>

	<div class="flex flex-col flex-grow p-4 overflow-hidden">
		<div class="relative flex-grow overflow-auto">
			{#key $currentStep}
				<div
					class="inset-0 mt-4"
					in:smoothTransition={{ duration: 400 }}
					out:smoothTransition|local={{ duration: 300 }}
				>
					<svelte:component this={CurrentComponent}>
						<Button
							on:click={$currentStep === steps.length - 1 ? handleFinish : nextStep}
							size="sm"
						>
							{$currentStep === steps.length - 1 ? 'Finish' : 'Continue to next step'}
						</Button>
					</svelte:component>
				</div>
			{/key}
		</div>
	</div>
</main>

<Dialog.Root bind:open={showDialog}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Trademark Application Summary</Dialog.Title>
			<Dialog.Description>
				Please review the information you've provided for your trademark application.
			</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<h3 class="text-lg font-semibold">Uploaded Images:</h3>
			<div class="flex gap-2">
				{#each $uploadStore.images || [] as image}
					<img src={image} alt="Uploaded trademark" class="object-cover w-20 h-20 rounded" />
				{/each}
			</div>

			{#if $uploadStore.visionData}
				<h3 class="text-lg font-semibold">Dominant Colours:</h3>
				<div class="flex gap-2">
					{#each $uploadStore.visionData.dominantColours || [] as colour}
						<div class="w-4 h-4 rounded" style="background-color: {colour}" />
					{/each}
				</div>
				<h3 class="text-lg font-semibold">Attributes:</h3>
				<ul>
					{#each $uploadStore.visionData.attributes || [] as attribute}
						<li>{attribute}</li>
					{/each}
				</ul>
				<h3 class="text-lg font-semibold">Confidence Level:</h3>
				<p>{$uploadStore.visionData.confidenceLevel}</p>
				<h3 class="text-lg font-semibold">Words:</h3>
				<ul>
					{#each $uploadStore.visionData.words || [] as word}
						<li>{word}</li>
					{/each}
				</ul>
			{/if}

			<h3 class="text-lg font-semibold">Previous Filings:</h3>
			<p>Filed in another country: {$filingsStore.radioValue || 'Not specified'}</p>
			{#if $filingsStore.radioValue === 'yes'}
				<p>Country: {$filingsStore.country.value || 'Not specified'}</p>
				<p>Date: {$filingsStore.date || 'Not specified'}</p>
			{/if}
			<h3 class="text-lg font-semibold">Goods and Services:</h3>
			<ul>
				{#each $appearanceStore.goodsAndServices || [] as item}
					<li>{item}</li>
				{/each}
			</ul>
		</div>
		<Dialog.Footer>
			<Button on:click={() => (showDialog = false)}>Close</Button>
			<Button variant="default" on:click={handleSubmitApplication}>Submit Application</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

{#if submissionError}
	<Alert variant="destructive">
		<Alert.Title>Error</Alert.Title>
		<Alert.Description>{submissionError}</Alert.Description>
	</Alert>
{/if}
