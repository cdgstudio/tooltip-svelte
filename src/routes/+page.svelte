<script>
	import { tooltip } from '../libs/tooltip';
	import Tool from './tool.svelte';
</script>

<div class="p-10 flex gap-5">
	<button
		use:tooltip={'I am a string'}
		class="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
		>Tooltip as string</button
	>

	<svg
		use:tooltip={Tool}
		xmlns="http://www.w3.org/2000/svg"
		width="50"
		height="50"
		viewBox="0 0 100 100"
	>
		<rect width="100%" height="100%" fill="#563d7c" />
		<circle cx="50" cy="50" r="30" fill="#007bff" />
	</svg>
</div>

<style>
</style>
