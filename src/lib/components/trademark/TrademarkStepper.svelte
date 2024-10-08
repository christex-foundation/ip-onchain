<script>
	import { currentStep, completedSteps } from '@/stores/trademarkSteps';

	export let steps;
	export let currentStepIndex;
	export let goToStep;
</script>

<div class="flex flex-col p-4 mt-14">
	{#each steps as step, index}
		<button
			class="flex items-center space-x-2 rounded-lg text-sm transition-colors {index ===
			currentStepIndex
				? 'text-primary'
				: index < currentStepIndex || $completedSteps.includes(index)
					? 'text-primary'
					: 'text-muted-foreground opacity-50'}"
			on:click={() => goToStep(index)}
			disabled={index > $currentStep}
		>
			<div class="flex items-center">
				<div
					class="flex h-9 w-9 items-center justify-center rounded-full {index <= currentStepIndex ||
					$completedSteps.includes(index)
						? 'bg-black text-white'
						: 'bg-gray-200 text-stone-400'}"
				>
					{#if $completedSteps.includes(index)}
						<svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
							<path
								fill-rule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clip-rule="evenodd"
							/>
						</svg>
					{:else}
						<span class="text-base font-medium">{index + 1}</span>
					{/if}
				</div>
				<span class="ml-2 font-semibold uppercase">{step.title}</span>
			</div>
		</button>

		{#if index !== steps.length - 1}
			<div class="flex justify-start">
				<div
					class="h-16 {index < currentStepIndex || $completedSteps.includes(index)
						? 'ml-[17px] w-1 bg-black'
						: 'ml-[18px] w-0.5 bg-neutral-200'}"
					role="presentation"
				></div>
			</div>
		{/if}
	{/each}
</div>
