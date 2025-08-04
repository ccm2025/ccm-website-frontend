<script lang="ts">
	import { toggleMenu } from '$lib/stores/SideMenu';
</script>

<a href="/" on:click={toggleMenu} class="hover:text-[rgb(var(--website-theme-color1))]">Home</a>
<a href="/about" on:click={toggleMenu} class="hover:text-[rgb(var(--website-theme-color1))]"
	>About Us</a
>
<a href="/events" on:click={toggleMenu} class="hover:text-[rgb(var(--website-theme-color1))]"
	>Events</a
>
<a href="/freshman" on:click={toggleMenu} class="hover:text-[rgb(var(--website-theme-color1))]"
	>Freshman Zone</a
>
<a href="/support" on:click={toggleMenu} class="hover:text-[rgb(var(--website-theme-color1))]"
	>Support</a
>
<a href="/give" on:click={toggleMenu} class="hover:text-[rgb(var(--website-theme-color1))]">Give</a>
<a href="/volunteer" on:click={toggleMenu} class="hover:text-[rgb(var(--website-theme-color1))]"
	>Volunteer</a
>
<a
	href="/plan-your-visit"
	on:click={toggleMenu}
	class="hover:text-[rgb(var(--website-theme-color1))]">Plan Your Visit</a
>
