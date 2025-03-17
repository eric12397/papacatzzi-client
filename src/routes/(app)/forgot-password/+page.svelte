<script lang="ts">
	import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";
	import Modal from "$lib/components/Modal.svelte";

    let email = $state("")
    let { form } = $props()

    const resend = async () => {
        // TODO: add some way to prevent users from spam clicking resend
        const form = document.getElementById("resetPasswordForm") as HTMLFormElement
        form.requestSubmit()
    }
</script>

<Modal close={() => goto("/")}>
    <div class="flex px-4 pt-4 justify-end">
        <button
            onclick={() => goto("/")}
            aria-label="Close modal"
            class="w-4 h-8"
        >
        <i class="fa-solid fa-x"></i>
        </button>
    </div>

    <form
        id="resetPasswordForm"
        method="POST" 
        class="flex flex-col h-full pt-2 px-6 pb-6 md:px-24 md:pb-10"
        use:enhance
    >
    {#if !form?.success}
        <h2 class="text-xl font-bold mb-4">Reset your password</h2>

        <p class="text-sm mb-4">Enter your email and we'll send you a link to reset your password.</p>

        <input
            type="email"
            name="email"
            placeholder="Email"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            bind:value={email}
        />

        <div class="mt-auto">
            <button
                type="submit"
                
                disabled={email === ""}
                class="w-full text-white py-2 px-4 rounded-full 
                {email === "" ? 'bg-gray-200 text-gray-400' : 'bg-indigo-700'}"
            >
                Reset password
            </button>
        </div>
    {:else}
        <div class="space-y-4">
            <h2 class="text-xl font-bold">Password reset email sent</h2>

            <p class="text-sm">You should receive an email with a link to complete the password reset process.</p>

            <p class="text-sm">Didn't get an email? <a class="cursor-pointer text-blue-600" onclick={resend}>Resend</a></p>

            <input
                hidden
                name="email"
                value={form.email}
            />
        </div>
    {/if}
    </form>
</Modal>