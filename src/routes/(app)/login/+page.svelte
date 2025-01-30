<script>
	import { goto } from "$app/navigation";
	import Login from "$lib/components/Login.svelte";
	import Modal from "$lib/components/Modal.svelte";
</script>

<Modal close={() => goto("/")}>
    <Login close={() => goto("/")}/>
</Modal>
