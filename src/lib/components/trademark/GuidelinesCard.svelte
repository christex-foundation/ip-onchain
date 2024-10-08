<script>
	import * as Card from '$lib/components/ui/card';
</script>

<Card.Root class="border-none shadow-none">
	<Card.Header>
		<Card.Title>
			<h1 class="text-2xl font-bold">Upload your mark</h1>
		</Card.Title>
	</Card.Header>
	<Card.Content>
		<p class="mb-4">
			This is the first step in registering your trademark. Here, you'll upload a high-quality image
			of your mark. Our AI will analyze the image to detect colors, composition, and format.
		</p>

		<h3 class="mb-2 font-semibold">Guidelines:</h3>
		<ul class="mb-4 list-disc list-inside">
			<li>Upload a clear, high-resolution image</li>
			<li>Ensure the image accurately represents your trademark</li>
			<li>Supported formats: PNG, JPG, SVG (max 5MB)</li>
		</ul>

		<p class="mb-4">
			After uploading, you'll see a color palette and mark composition analysis. This information
			helps ensure your trademark is unique and properly categorized. You can upload up to 5
			variations if needed.
		</p>

		<p class="mb-4">
			Review the AI-detected information carefully. If anything seems incorrect, you'll have a
			chance to make adjustments in the next steps.
		</p>
	</Card.Content>
</Card.Root>
