<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		goto('/trademark/create');
	});
</script>

<main>
	<p>Redirecting to trademark creation...</p>
</main>
