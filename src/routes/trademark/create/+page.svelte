<script lang="ts">
	import { cubicInOut } from 'svelte/easing';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { currentStep, completedSteps } from '@/stores/trademarkSteps';

	import { Button } from '$lib/components/ui/button/index.js';
	import TrademarkStepper from '$lib/components/trademark/TrademarkStepper.svelte';
	import Exhibition from '$lib/components/trademark/Exhibition.svelte';
	import Translation from '$lib/components/trademark/Translation.svelte';
	import Upload from '$lib/components/trademark/Upload.svelte';
	import Mark from '$lib/components/trademark/Mark.svelte';

	const steps = [
		{ component: Exhibition, path: 'exhibition', title: 'Exhibition' },
		{ component: Translation, path: 'translation', title: 'Translation' },
		{ component: Upload, path: 'upload', title: 'Upload' },
		{ component: Mark, path: 'mark', title: 'Mark' }
	];

	$: currentPath = $page.params.step || steps[0].path;
	$: CurrentComponent =
		steps.find((step) => step.path === currentPath)?.component || steps[0].component;
	$: currentStepIndex = steps.findIndex((step) => step.path === currentPath);

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
				const opacity = eased;
				const yOffset = (1 - eased) * 20; // Subtle 20px slide

				return `
					opacity: ${opacity};
					transform: ${existingTransform} translate3d(0, ${yOffset}px, 0);
				`;
			}
		};
	}
</script>

<main class="flex h-screen overflow-hidden">
	<div class="flex flex-grow flex-col overflow-hidden p-4">
		<div class="relative flex-grow overflow-auto">
			{#key $currentStep}
				<div
					class="absolute inset-0"
					in:smoothTransition={{ duration: 400 }}
					out:smoothTransition|local={{ duration: 300 }}
				>
					<svelte:component this={CurrentComponent} />
				</div>
			{/key}
		</div>
		<div class="mt-4 flex justify-end">
			<Button on:click={nextStep} size="sm">
				{$currentStep === steps.length - 1 ? 'Finish' : 'Next'}
			</Button>
		</div>
	</div>

	<!-- Stepper for all screen sizes -->
	<div class="w-64 border-l border-gray-200 p-4 dark:border-gray-700">
		<TrademarkStepper {steps} {currentStepIndex} {goToStep} />
	</div>
</main>
