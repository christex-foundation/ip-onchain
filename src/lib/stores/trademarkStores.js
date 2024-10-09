import { writable } from 'svelte/store';

export const uploadStore = writable({
	images: [],
	visionData: {
		dominantColours: [],
		attributes: [],
		confidenceLevel: 0,
		words: [],
		error: undefined
	}
});

export const filingsStore = writable({
	radioValue: undefined,
	country: undefined,
	date: undefined
});

export const appearanceStore = writable({
	goodsAndServices: []
});

export function clearTrademarkStores() {
	uploadStore.set({
		images: [],
		visionData: {
			dominantColours: [],
			attributes: [],
			confidenceLevel: 0,
			words: [],
			error: undefined
		}
	});
	filingsStore.set({ radioValue: undefined, country: undefined, date: undefined });
	appearanceStore.set({ goodsAndServices: [] });
}
