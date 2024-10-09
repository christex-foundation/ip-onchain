import { writable } from 'svelte/store';

export const currentStep = writable(0);
export const completedSteps = writable([]);

export function clearTrademarkStepsStores() {
	currentStep.set(0);
	completedSteps.set([]);
}
