<script>
	import '../app.css';

	import Triangle from 'lucide-svelte/icons/triangle';
	import Bot from 'lucide-svelte/icons/bot';
	import SquareTerminal from 'lucide-svelte/icons/square-terminal';
	import CodeXML from 'lucide-svelte/icons/code-xml';
	import Settings2 from 'lucide-svelte/icons/settings-2';
	import LifeBuoy from 'lucide-svelte/icons/life-buoy';
	import Book from 'lucide-svelte/icons/book';
	import SquareUser from 'lucide-svelte/icons/square-user';

	import { Button } from '$lib/components/ui/button/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { Alert, AlertTitle, AlertDescription } from '$lib/components/ui/alert';
	import { browser } from '$app/environment';
	import { fade, fly } from 'svelte/transition';

	let innerWidth;
	$: isMobile = browser && innerWidth < 1024;
</script>

<svelte:window bind:innerWidth />

{#if isMobile}
	<div transition:fade={{ duration: 300 }}>
		<Alert class="m-4">
			<AlertTitle>Unsupported Screen Size</AlertTitle>
			<AlertDescription>This application only works on tablet and larger screens.</AlertDescription>
		</Alert>
	</div>
{:else}
	<div transition:fly={{ y: 20, duration: 300 }}>
		<div class="flex w-full h-screen">
			<aside class="fixed inset-y-0 left-0 z-20 flex flex-col border-r bg-background">
				<div class="p-2 border-b">
					<Button variant="outline" size="icon" aria-label="Home">
						<Triangle class="size-5 fill-foreground" />
					</Button>
				</div>
				<nav class="grid gap-1 p-2">
					<Tooltip.Root>
						<Tooltip.Trigger asChild let:builder>
							<Button
								variant="ghost"
								size="icon"
								class="rounded-lg bg-muted"
								aria-label="Trademark"
								builders={[builder]}
								href="/trademark/create"
							>
								<SquareTerminal class="size-5" />
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content side="right" sideOffset={5}>Trademark</Tooltip.Content>
					</Tooltip.Root>
					<Tooltip.Root>
						<Tooltip.Trigger asChild let:builder>
							<Button
								variant="ghost"
								size="icon"
								class="rounded-lg"
								aria-label="Models"
								builders={[builder]}
							>
								<Bot class="size-5" />
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content side="right" sideOffset={5}>Models</Tooltip.Content>
					</Tooltip.Root>
					<Tooltip.Root>
						<Tooltip.Trigger asChild let:builder>
							<Button
								variant="ghost"
								size="icon"
								class="rounded-lg"
								aria-label="API"
								builders={[builder]}
							>
								<CodeXML class="size-5" />
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content side="right" sideOffset={5}>API</Tooltip.Content>
					</Tooltip.Root>
					<Tooltip.Root>
						<Tooltip.Trigger asChild let:builder>
							<Button
								variant="ghost"
								size="icon"
								class="rounded-lg"
								aria-label="Documentation"
								builders={[builder]}
							>
								<Book class="size-5" />
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content side="right" sideOffset={5}>Documentation</Tooltip.Content>
					</Tooltip.Root>
					<Tooltip.Root>
						<Tooltip.Trigger asChild let:builder>
							<Button
								variant="ghost"
								size="icon"
								class="rounded-lg"
								aria-label="Settings"
								builders={[builder]}
							>
								<Settings2 class="size-5" />
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content side="right" sideOffset={5}>Settings</Tooltip.Content>
					</Tooltip.Root>
				</nav>
				<nav class="grid gap-1 p-2 mt-auto">
					<Tooltip.Root>
						<Tooltip.Trigger asChild let:builder>
							<Button
								variant="ghost"
								size="icon"
								class="mt-auto rounded-lg"
								aria-label="Help"
								builders={[builder]}
							>
								<LifeBuoy class="size-5" />
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content side="right" sideOffset={5}>Help</Tooltip.Content>
					</Tooltip.Root>
					<Tooltip.Root>
						<Tooltip.Trigger asChild let:builder>
							<Button
								variant="ghost"
								size="icon"
								class="mt-auto rounded-lg"
								aria-label="Account"
								builders={[builder]}
							>
								<SquareUser class="size-5" />
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content side="right" sideOffset={5}>Account</Tooltip.Content>
					</Tooltip.Root>
				</nav>
			</aside>
			<main class="ml-[53px] flex-1">
				<div class="h-full p-6 overflow-auto">
					<!-- main area -->
					<slot></slot>
				</div>
			</main>
		</div>
	</div>
{/if}
