<script>
	export let name;
	export let registration;
	export let status;
	export let type;

	const getStatusClass = (status) => {
		switch (status.toLowerCase()) {
			case 'approved':
				return 'text-green-500 bg-green-400 border-green-400';
			case 'rejected':
				return 'text-red-600 bg-red-500 border-red-500';
			case 'in review':
				return 'text-orange-500 bg-orange-400 border-orange-400';
			default:
				return '';
		}
	};

	$: statusClass = getStatusClass(status);
</script>

<article
	class="flex w-full flex-wrap items-center justify-center gap-10 border-b-[0.5px] border-solid border-b-stone-300 py-4 pl-2.5 max-md:max-w-full"
>
	<div class="my-auto w-[183px] shrink grow gap-2 self-stretch">{name}</div>
	<div class="my-auto w-[130px] shrink grow gap-2 self-stretch whitespace-nowrap">
		{registration}
	</div>
	<div
		class="my-auto flex w-[67px] shrink grow items-center gap-2 self-stretch whitespace-nowrap text-xs uppercase leading-none tracking-wide"
	>
		<div
			class="my-auto gap-3 self-stretch rounded border border-solid border-opacity-50 bg-opacity-10 px-3 py-1 {statusClass}"
		>
			{status}
		</div>
	</div>
	<div class="my-auto w-[103px] shrink grow gap-2 self-stretch whitespace-nowrap">{type}</div>
</article>
