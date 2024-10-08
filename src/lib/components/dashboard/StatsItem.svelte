<script>
	export let label = '';
	export let value = '';
	export let color = '';
</script>

<div class="my-auto flex items-center gap-3 self-stretch rounded-lg p-2 bg-{color} bg-opacity-10">
	<div
		class="my-auto flex h-4 w-4 flex-col items-center justify-center self-stretch overflow-hidden rounded-lg bg-white px-1 shadow-[0px_2px_12px_rgba(0,0,0,0.15)]"
	>
		<div class="flex h-2.5 w-2.5 shrink-0 bg-{color} rounded-lg"></div>
	</div>
	<div class="self-stretch my-auto text-xs leading-none text-stone-400">{label}</div>
	<div class="self-stretch my-auto text-lg font-bold leading-none text-stone-700">{value}</div>
</div>
