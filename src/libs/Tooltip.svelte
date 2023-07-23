<script lang="ts">
	import { autoPlacement, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import { createEventDispatcher, onMount, type ComponentType } from 'svelte';

	export let componentOrString: ComponentType | string;
	export let parent: HTMLElement | SVGSVGElement;

	const dispatch = createEventDispatcher();

	let root: HTMLElement;

	onMount(async () => {
		if (typeof componentOrString !== 'string') {
			new componentOrString({
				target: root
			});
		}

		const { x, y } = await computePosition(parent, root, {
			placement: 'top',
			middleware: [offset(6), shift({ padding: 5 }), flip({})]
		});

		root.style.left = `${x}px`;
		root.style.top = `${y}px`;

		root.addEventListener('mouseenter', () => dispatch('mouseenter'));
		root.addEventListener('mouseleave', () => dispatch('mouseleave'));
	});
</script>

<div bind:this={root} class="tooltip">
	{#if typeof componentOrString === 'string'}
		{componentOrString}
	{/if}
</div>

<style>
	.tooltip {
		width: max-content;
		position: absolute;

		max-width: 12rem;
		padding: 0.7rem;
		font-size: 0.85rem;
		color: #fff;
		background: #000;
		border-radius: 0.25rem;
		box-sizing: border-box;
	}
</style>
