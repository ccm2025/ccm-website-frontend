<script lang="ts">
	import type { StyledTextProps } from '$lib/types';

	export let data: StyledTextProps[] | null | undefined;
	export let as: 'p' | 'h1' | 'h2' | 'h3' | 'span' | 'div' = 'p';
	export let gap: number = 4; // Default gap between lines

	function getClasses(line: StyledTextProps): string {
		const sizeClasses = {
			Small: 'text-sm md:text-base',
			Normal: 'text-base',
			Large: 'text-2xl md:text-3xl',
			'Extra-Large': 'text-4xl md:text-5xl font-bold'
		};
		const colorClasses = {
			Default: '',
			'Website-Theme-Color1': 'text-[rgb(var(--website-theme-color1))]',
			'Website-Theme-Color2': 'text-[rgb(var(--website-theme-color2))]'
		};
		const styleClasses = {
			Normal: 'not-italic',
			Italic: 'italic',
			Bold: 'font-bold',
			Underline: 'underline'
		};

		return [
			'transition-colors',
			sizeClasses[line.font_size || 'Normal'],
			colorClasses[line.color || 'Default'],
			styleClasses[line.font_style || 'Normal']
		].join(' ');
	}
</script>

{#if data && data.length > 0}
	<div>
		{#each data as line, i (i)}
			<svelte:element this={as} class={getClasses(line) + (i > 0 ? ` mt-${gap}` : '')}>
				{line.text}
			</svelte:element>
		{/each}
	</div>
{/if}
