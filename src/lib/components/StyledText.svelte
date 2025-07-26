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
		const styleClasses = {
			Normal: 'not-italic',
			Italic: 'italic',
			Bold: 'font-bold',
			Underline: 'underline'
		};

		return [
			'transition-colors',
			sizeClasses[line.font_size || 'Normal'],
			styleClasses[line.font_style || 'Normal']
		].join(' ');
	}
</script>

{#if data && data.length > 0}
	<div class={'space-y-' + gap}>
		{#each data as line, i (i)}
			<svelte:element
				this={as}
				class={getClasses(line)}
				style={line.color && line.color !== 'Default'
					? `color: var(--${line.color.toLowerCase()})`
					: ''}
			>
				{line.text}
			</svelte:element>
		{/each}
	</div>
{/if}
