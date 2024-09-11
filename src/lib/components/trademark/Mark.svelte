<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Trademark Mark Details</Card.Title>
		<Card.Description>Enter the details of your trademark mark</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="grid gap-6">
			<div class="grid gap-3">
				<Label for="mark-name">Mark Name</Label>
				<Input id="mark-name" type="text" placeholder="Enter mark name" />
			</div>
			<div class="grid gap-3">
				<Label for="mark-description">Mark Description</Label>
				<Textarea
					id="mark-description"
					placeholder="Describe your trademark mark"
					class="min-h-32"
				/>
			</div>
		</div>
	</Card.Content>
</Card.Root>
