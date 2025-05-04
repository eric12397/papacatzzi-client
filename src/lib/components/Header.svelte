<script lang="ts">
	import { goto } from "$app/navigation";
	import AddPhoto from "./AddPhoto.svelte";
	let { user } : { user: User | null } = $props();
</script>

<header class="absolute top-0 left-0 w-full bg-white z-[1000] shadow-md">
	<div class="container mx-auto flex justify-between items-center p-6">
		<!-- Logo -->
		<a href="/" class="text-2xl font-bold">
			Papacatzzi
		</a>
		<!-- Navigation Links -->

		<div class="flex space-x-9">
			<label for="fileInput" class="cursor-pointer">📷</label>
			<AddPhoto onSuccess={() => goto("/upload")}/>
			{#if user}
				<div>
					<a href="/logout" class="hover:text-blue-300">Log Out</a>
				</div>	
			{:else}
				<div>
					<a href="/login" class="hover:text-blue-300">Log In</a>
				</div>
				<div>
					<a href="/signup" class="hover:text-blue-300">Sign Up</a>
				</div>
			{/if}
		</div>

	</div>
</header>