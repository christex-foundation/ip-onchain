<script>
	import { writable } from 'svelte/store';
	import { cubicInOut } from 'svelte/easing';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import { Button } from '$lib/components/ui/button/index.js';
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

	const currentStep = writable(0);
	const completedSteps = writable([]);

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

	<div class="w-64 border-l border-gray-200 p-4 dark:border-gray-700">
		<div class="flex flex-col space-y-2">
			{#each steps as step, index}
				<button
					class="flex items-center space-x-2 rounded-lg p-2 text-sm transition-colors {index ===
					currentStepIndex
						? 'text-primary'
						: index < currentStepIndex
							? 'text-muted-foreground'
							: 'text-muted-foreground opacity-50'}"
					on:click={() => goToStep(index)}
					disabled={index > currentStepIndex}
				>
					<div
						class="flex h-5 w-5 items-center justify-center rounded-full border {index ===
						currentStepIndex
							? 'border-primary'
							: index < currentStepIndex
								? 'border-muted-foreground'
								: 'border-muted'}"
					>
						{#if $completedSteps.includes(index)}
							<svg class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
						{:else}
							{index + 1}
						{/if}
					</div>
					<span class={$completedSteps.includes(index) ? 'line-through' : ''}>{step.title}</span>
				</button>
			{/each}
		</div>
	</div>
</main>
