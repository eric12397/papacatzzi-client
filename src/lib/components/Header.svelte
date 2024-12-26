<script lang="ts">
	import { goto } from "$app/navigation";
	import AddPhoto from "./AddPhoto.svelte";
</script>

<style>

</style>

<header class="bg-white">
	<div class="container mx-auto flex justify-between items-center p-6">
		<!-- Logo -->
		<a href="/" class="text-2xl font-bold">
			Papacatzzi
		</a>
		<!-- Navigation Links -->

		<div class="flex space-x-9">
			<label for="fileInput" class="cursor-pointer">📷</label>
			<AddPhoto onSuccess={() => goto("/upload")}/>
			<div>
				<a href="#" class="hover:text-blue-300">Log In</a>
			</div>
			<div>
				<a href="#" class="hover:text-blue-300">Sign Up</a>
			</div>
		</div>

	</div>
</header>

