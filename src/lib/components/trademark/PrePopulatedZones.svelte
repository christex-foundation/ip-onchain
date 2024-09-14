<script>
	import { Button } from '$lib/components/ui/button';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
</script>

<Collapsible.Root class="w-full space-y-2">
	<Collapsible.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline" class="mt-4 w-full">
			View pre-populated zones
		</Button>
	</Collapsible.Trigger>
	<Collapsible.Content class="space-y-2">
		<div class="rounded-md border px-4 py-3 font-mono text-sm">@huntabyte/bits-ui</div>
		<div class="rounded-md border px-4 py-3 font-mono text-sm">@melt-ui/melt-ui</div>
		<div class="rounded-md border px-4 py-3 font-mono text-sm">@sveltejs/svelte</div>
	</Collapsible.Content>
</Collapsible.Root>
