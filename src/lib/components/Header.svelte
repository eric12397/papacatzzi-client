<script lang="ts">
	import { goto } from "$app/navigation";
	import AddPhoto from "./AddPhoto.svelte";
	import SignUpModal from "./sign-up/SignUpModal.svelte";

	let showModal = $state(false)

	const openModal = () => {
		showModal = true
	};

	const closeModal = () => {
		showModal = false
	};
</script>

<style>

</style>

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
			<div>
				<a href="#" class="hover:text-blue-300">Log In</a>
			</div>
			<div>
				<a onclick={openModal} class="hover:text-blue-300">Sign Up</a>
			</div>
		</div>

	</div>
</header>
{#if showModal}
	<SignUpModal close={closeModal}/>
{/if}

