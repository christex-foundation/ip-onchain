<script>
	import { currentStep, completedSteps } from '@/stores/trademarkSteps';

	export let steps;
	export let currentStepIndex;
	export let goToStep;
</script>

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
			disabled={index > $currentStep}
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
					<svg class="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
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
