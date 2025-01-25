<script lang="ts">
	import { goto } from "$app/navigation";
	import AddPhoto from "./AddPhoto.svelte";
	import Login from "./Login.svelte";
	import Modal from "./Modal.svelte";
	import SignUpFlow from "./sign-up/SignUpFlow.svelte";

	let showModal = $state(false)
	let component = $state("")

	const openModal = (componentToRender: string) => {
		component = componentToRender
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
				<a onclick={() => openModal("login")} class="hover:text-blue-300">Log In</a>
			</div>
			<div>
				<a onclick={() => openModal("signup")} class="hover:text-blue-300">Sign Up</a>
			</div>
		</div>

	</div>
</header>
{#if showModal}
	<Modal close={closeModal}>
		{#if component === "signup"}
		<SignUpFlow close={closeModal}/>

		{:else if component === "login"}
		<Login close={closeModal}/>

		{/if}
	</Modal>
{/if}

