<script lang="ts">
	import { Globe, ChevronRight, X } from 'lucide-svelte';

	export let btnClass: string;
</script>

<button class={btnClass}>
	<Globe size="22" />
	<span>English</span>
	<ChevronRight size="22" />
</button>
