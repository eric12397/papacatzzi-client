<script>
	import { goto } from "$app/navigation";
	import Modal from "$lib/components/Modal.svelte";
	import SignUpFlow from "$lib/components/sign-up/SignUpFlow.svelte";
</script>

<Modal close={() => goto("/")}>
    <SignUpFlow close={() => goto("/")}/>
</Modal>
