<script lang="ts">
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	// import Home from 'lucide-svelte/icons/home';
	// import LineChart from 'lucide-svelte/icons/line-chart';
	import Package from 'lucide-svelte/icons/package';
	import Package2 from 'lucide-svelte/icons/package-2';
	import PanelLeft from 'lucide-svelte/icons/panel-left';
	import CirclePlus from 'lucide-svelte/icons/circle-plus';
	import Search from 'lucide-svelte/icons/search';
	import Settings from 'lucide-svelte/icons/settings';
	import ShoppingCart from 'lucide-svelte/icons/shopping-cart';
	import Upload from 'lucide-svelte/icons/upload';
	import UsersRound from 'lucide-svelte/icons/users-round';

	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import * as ToggleGroup from '$lib/components/ui/toggle-group/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { createEventDispatcher } from 'svelte';

	/** @type {string[]} */
	let imageUrls = ['/images/placeholder.svg', '/images/placeholder.svg', '/images/placeholder.svg'];
	const dispatch = createEventDispatcher();

	/**
	 * @param {Event} event
	 */
	function handleFileUpload(event) {
		const input = /** @type {HTMLInputElement} */ (event.target);
		if (input.files && input.files.length > 0) {
			Array.from(input.files).forEach((file) => {
				if (file.type.startsWith('image/')) {
					const reader = new FileReader();
					reader.onload = (e) => {
						const result = /** @type {string} */ (e.target?.result);
						imageUrls = [result, ...imageUrls.slice(0, 2)];
						dispatch('imageUpload', { images: imageUrls });
					};
					reader.readAsDataURL(file);
				} else {
					alert(`File "${file.name}" is not an image file.`);
				}
			});
		}
	}
</script>

<header class="bg-background sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b px-4">
	<h1 class="text-xl font-semibold">Trademark</h1>
</header>

<div class="flex flex-col sm:gap-4 sm:py-4">
	<main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
		<div class="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
			<div class="grid gap-4 md:grid-cols-[250px_1fr] lg:grid-cols-3 lg:gap-8">
				<div class="grid auto-rows-max items-start gap-4 lg:gap-8">
					<!-- Trademark Image -->
					<Card.Root class="overflow-hidden">
						<Card.Header>
							<Card.Title>Trademark Images</Card.Title>
							<Card.Description>
								Lipsum dolor sit amet, consectetur adipiscing elit
							</Card.Description>
						</Card.Header>
						<Card.Content>
							<div class="grid gap-2">
								<img
									alt="Trademark"
									class="aspect-square w-full rounded-md object-cover"
									height="300"
									src={imageUrls[0]}
									width="300"
								/>
								<div class="grid grid-cols-3 gap-2">
									<button>
										<img
											alt="Trademark"
											class="aspect-square w-full rounded-md object-cover"
											height="84"
											src={imageUrls[1]}
											width="84"
										/>
									</button>
									<button>
										<img
											alt="Trademark"
											class="aspect-square w-full rounded-md object-cover"
											height="84"
											src={imageUrls[2]}
											width="84"
										/>
									</button>
									<label
										class="flex aspect-square w-full cursor-pointer items-center justify-center rounded-md border border-dashed"
									>
										<input
											type="file"
											accept="image/*"
											multiple
											class="hidden"
											on:change={handleFileUpload}
										/>
										<Upload class="text-muted-foreground h-4 w-4" />
										<span class="sr-only">Upload</span>
									</label>
								</div>
							</div>
						</Card.Content>
					</Card.Root>

					<!-- Trademark Status -->
					<Card.Root>
						<Card.Header>
							<Card.Title>Trademark Status</Card.Title>
						</Card.Header>
						<Card.Content>
							<div class="grid gap-6">
								<div class="grid gap-3">
									<Label for="status">Status</Label>
									<Select.Root>
										<Select.Trigger id="status" aria-label="Select status">
											<Select.Value placeholder="Select status" />
										</Select.Trigger>
										<Select.Content>
											<Select.Item value="draft" label="Draft">Draft</Select.Item>
											<Select.Item value="published" label="Active">Active</Select.Item>
											<Select.Item value="archived" label="Archived">Archived</Select.Item>
										</Select.Content>
									</Select.Root>
								</div>
							</div>
						</Card.Content>
					</Card.Root>
				</div>
				<div class="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
					<Card.Root>
						<Card.Header>
							<Card.Title>Trademark Details</Card.Title>
							<Card.Description>
								Lipsum dolor sit amet, consectetur adipiscing elit
							</Card.Description>
						</Card.Header>
						<Card.Content>
							<div class="grid gap-6">
								<div class="grid gap-3">
									<Label for="name">Name</Label>
									<Input id="name" type="text" class="w-full" value="Gamer Gear Pro Controller" />
								</div>
								<div class="grid gap-3">
									<Label for="description">Description</Label>
									<Textarea
										id="description"
										value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
										class="min-h-32"
									/>
								</div>
							</div>
						</Card.Content>
					</Card.Root>
					<Card.Root>
						<Card.Header>
							<Card.Title>Stock</Card.Title>
							<Card.Description>
								Lipsum dolor sit amet, consectetur adipiscing elit
							</Card.Description>
						</Card.Header>
						<Card.Content>
							<Table.Root>
								<Table.Header>
									<Table.Row>
										<Table.Head class="w-[100px]">SKU</Table.Head>
										<Table.Head>Stock</Table.Head>
										<Table.Head>Price</Table.Head>
										<Table.Head class="w-[100px]">Size</Table.Head>
									</Table.Row>
								</Table.Header>
								<Table.Body>
									<Table.Row>
										<Table.Cell class="font-semibold">GGPC-001</Table.Cell>
										<Table.Cell>
											<Label for="stock-1" class="sr-only">Stock</Label>
											<Input id="stock-1" type="number" value="100" />
										</Table.Cell>
										<Table.Cell>
											<Label for="price-1" class="sr-only">Price</Label>
											<Input id="price-1" type="number" value="99.99" />
										</Table.Cell>
										<Table.Cell>
											<ToggleGroup.Root type="single" value="s" variant="outline">
												<ToggleGroup.Item value="s">S</ToggleGroup.Item>
												<ToggleGroup.Item value="m">M</ToggleGroup.Item>
												<ToggleGroup.Item value="l">L</ToggleGroup.Item>
											</ToggleGroup.Root>
										</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell class="font-semibold">GGPC-002</Table.Cell>
										<Table.Cell>
											<Label for="stock-2" class="sr-only">Stock</Label>
											<Input id="stock-2" type="number" value="143" />
										</Table.Cell>
										<Table.Cell>
											<Label for="price-2" class="sr-only">Price</Label>
											<Input id="price-2" type="number" value="99.99" />
										</Table.Cell>
										<Table.Cell>
											<ToggleGroup.Root type="single" value="m" variant="outline">
												<ToggleGroup.Item value="s">S</ToggleGroup.Item>
												<ToggleGroup.Item value="m">M</ToggleGroup.Item>
												<ToggleGroup.Item value="l">L</ToggleGroup.Item>
											</ToggleGroup.Root>
										</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell class="font-semibold">GGPC-003</Table.Cell>
										<Table.Cell>
											<Label for="stock-3" class="sr-only">Stock</Label>
											<Input id="stock-3" type="number" value="32" />
										</Table.Cell>
										<Table.Cell>
											<Label for="price-3" class="sr-only">Stock</Label>
											<Input id="price-3" type="number" value="99.99" />
										</Table.Cell>
										<Table.Cell>
											<ToggleGroup.Root type="single" value="s" variant="outline">
												<ToggleGroup.Item value="s">S</ToggleGroup.Item>
												<ToggleGroup.Item value="m">M</ToggleGroup.Item>
												<ToggleGroup.Item value="l">L</ToggleGroup.Item>
											</ToggleGroup.Root>
										</Table.Cell>
									</Table.Row>
								</Table.Body>
							</Table.Root>
						</Card.Content>
						<Card.Footer class="justify-center border-t p-4">
							<Button size="sm" variant="ghost" class="gap-1">
								<CirclePlus class="h-3.5 w-3.5" />
								Add Variant
							</Button>
						</Card.Footer>
					</Card.Root>
					<Card.Root>
						<Card.Header>
							<Card.Title>Trademark Category</Card.Title>
						</Card.Header>
						<Card.Content>
							<div class="grid gap-6 sm:grid-cols-3">
								<div class="grid gap-3">
									<Label for="category">Category</Label>
									<Select.Root>
										<Select.Trigger id="category" aria-label="Select category">
											<Select.Value placeholder="Select category" />
										</Select.Trigger>
										<Select.Content>
											<Select.Item value="clothing" label="Clothing">Clothing</Select.Item>
											<Select.Item value="electronics" label="Electronics">Electronics</Select.Item>
											<Select.Item value="accessories" label="Accessories">Accessories</Select.Item>
										</Select.Content>
									</Select.Root>
								</div>
								<div class="grid gap-3">
									<Label for="subcategory">Subcategory (optional)</Label>
									<Select.Root>
										<Select.Trigger id="subcategory" aria-label="Select subcategory">
											<Select.Value placeholder="Select subcategory" />
										</Select.Trigger>
										<Select.Content>
											<Select.Item value="t-shirts" label="T-Shirts">T-Shirts</Select.Item>
											<Select.Item value="hoodies" label="Hoodies">Hoodies</Select.Item>
											<Select.Item value="sweatshirts" label="Sweatshirts">Sweatshirts</Select.Item>
										</Select.Content>
									</Select.Root>
								</div>
							</div>
						</Card.Content>
					</Card.Root>
				</div>
			</div>
			<div class="flex items-center justify-center gap-2 md:hidden">
				<Button variant="outline" size="sm">Discard</Button>
				<Button size="sm">Save Trademark</Button>
			</div>
		</div>
	</main>
</div>
