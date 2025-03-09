<script lang="ts">
	import { enhance } from "$app/forms";
	import GoogleSignIn from "./GoogleSignIn.svelte";

    let email = $state("")
    let password = $state("")

    let { close }: { close: () => void } = $props()
</script>

<style>
    .link-color {
        color: #115BCA;
    }
</style>

<div class="flex px-4 pt-4 justify-end">
    <button
        onclick={close}
        aria-label="Close modal"
        class="w-4 h-8"
    >
    <i class="fa-solid fa-x"></i>
    </button>
</div>

<form 
    method="POST" 
    class="flex flex-col h-full pt-2 px-6 pb-6 md:px-24 md:pb-10"
    use:enhance
>
    <h2 class="text-xl font-bold mb-4">Log In</h2>

    <div class="space-y-4">
        <input
            type="email"
            name="email"
            placeholder="Email"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            bind:value={email}
        />

        <input
            type="password"
            name="password"
            placeholder="Password"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            bind:value={password}
        />

        <div class="flex items-center w-full my-4">
            <hr class="flex-grow border-gray-300" />
            <span class="px-3 text-gray-500 text-sm">OR</span>
            <hr class="flex-grow border-gray-300" />
        </div>

        <GoogleSignIn />
    </div>
    
    <div class="mt-2">
        <small>Don't have an account? <a href="/signup" class="link-color">Sign Up</a></small>
    </div>

    <div class="mt-2">
        <small><a href="/forgot-password" class="link-color">Forgot password? </a></small>
    </div>
    
    <div class="mt-auto">
        <button
            type="submit"
            disabled={!email || !password}
            class="w-full text-white py-2 px-4 rounded-full 
            {!email || !password ? 'bg-gray-200 text-gray-400' : 'bg-indigo-700'}"
        >
            Log In
        </button>
    </div>
</form>
