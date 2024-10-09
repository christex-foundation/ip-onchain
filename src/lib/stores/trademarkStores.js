import { writable } from 'svelte/store';

export const uploadStore = writable({
	images: []
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
	uploadStore.set({ images: [] });
	filingsStore.set({ radioValue: undefined, country: undefined, date: undefined });
	appearanceStore.set({ goodsAndServices: [] });
}
