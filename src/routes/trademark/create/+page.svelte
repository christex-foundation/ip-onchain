<script>
	import { cubicInOut } from 'svelte/easing';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { currentStep, completedSteps } from '@/stores/trademarkSteps';

	import { Button } from '$lib/components/ui/button/index.js';
	import TrademarkStepper from '$lib/components/trademark/TrademarkStepper.svelte';
	import Upload from '@/components/trademark/Upload.svelte';
	import Filings from '@/components/trademark/PreviousFilings.svelte';
	import Appearance from '@/components/trademark/Appearance.svelte';

	const steps = [
		{ component: Upload, path: 'upload', title: 'Upload' },
		{ component: Filings, path: 'previous-filings', title: 'Previous Filings' },
		{ component: Appearance, path: 'appearance', title: 'Appearance' }
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
	<!-- Stepper for all screen sizes -->
	<div class="p-4 border-gray-200 w-60 dark:border-gray-700">
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
						<Button on:click={nextStep} size="sm">
							{$currentStep === steps.length - 1 ? 'Finish' : 'Continue to next step'}
						</Button>
					</svelte:component>
				</div>
			{/key}
		</div>
		<div class="flex justify-end mt-4"></div>
	</div>
</main>
