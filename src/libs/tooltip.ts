import type { ActionReturn } from 'svelte/action';
import Tooltip from './Tooltip.svelte';
import type { ComponentType } from 'svelte';

export function tooltip(
	element: HTMLElement | SVGSVGElement,
	display: ComponentType | string
): ActionReturn {
	let tooltip: Tooltip | null = null;
	let timeoutId = 0;

	function showTooltip() {
		if (tooltip === null) {
			tooltip = new Tooltip({
				target: document.body,
				props: {
					componentOrString: display,
					parent: element
				}
			});

			tooltip.$on('mouseenter', cancelRemove);
			tooltip.$on('mouseleave', delayedDestroy);
		} else {
			cancelRemove();
		}
	}

	function cancelRemove() {
		clearTimeout(timeoutId);
	}

	function delayedDestroy() {
		cancelRemove();

		timeoutId = setTimeout(() => {
			if (tooltip !== null) {
				tooltip.$destroy();
				tooltip = null;
			}
		}, 100);
	}

	element.addEventListener('mouseenter', showTooltip);
	element.addEventListener('focus', showTooltip);
	element.addEventListener('mouseleave', delayedDestroy);
	element.addEventListener('blur', delayedDestroy);

	return {
		destroy() {
			element.removeEventListener('mouseenter', showTooltip);
			element.removeEventListener('focus', showTooltip);
			element.removeEventListener('mouseleave', delayedDestroy);
			element.removeEventListener('blur', delayedDestroy);
		}
	};
}
