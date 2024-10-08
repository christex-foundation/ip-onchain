<script>
	import { Button } from '$lib/components/ui/button';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
</script>

<Collapsible.Root class="w-auto space-y-2 max-w-fit">
	<Collapsible.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline" class="w-full mt-4">
			View pre-populated zones
		</Button>
	</Collapsible.Trigger>
	<Collapsible.Content class="space-y-2">
		<div class="px-4 py-3 font-mono text-sm border rounded-md">@huntabyte/bits-ui</div>
		<div class="px-4 py-3 font-mono text-sm border rounded-md">@melt-ui/melt-ui</div>
		<div class="px-4 py-3 font-mono text-sm border rounded-md">@sveltejs/svelte</div>
	</Collapsible.Content>
</Collapsible.Root>
