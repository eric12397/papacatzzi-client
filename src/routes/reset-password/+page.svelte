<script>
	import { enhance } from "$app/forms";

    let password = $state("")
    let confirmPassword = $state("")
    
    let btnDisabled = $derived(password === "" || confirmPassword === "")
</script>

<style>
    
</style>

<!-- <div class="w-screen" style="mask-image: url('/images/cat-background.webp');mask-size: cover;mask-type: alpha;">
</div> -->
<div
    class="flex flex-col w-full h-full fixed bg-white
    md:w-[500px] md:h-[600px] md:rounded-2xl md:shadow-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
>
    <form 
        method="POST" 
        class="flex flex-col h-full pt-14 px-6 pb-6 md:px-24 md:pb-10"
        use:enhance
    >
        <h2 class="text-xl font-bold mb-4">Reset your password</h2>

        <div class="space-y-4">
            <input
                type="password"
                name="password"
                placeholder="New Password"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                bind:value={password}
            />

            <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                bind:value={confirmPassword}
            />
        </div>

        <div class="mt-auto">
            <button
                type="submit"
                disabled={btnDisabled}
                class="w-full text-white py-2 px-4 rounded-full 
                {btnDisabled ? 'bg-gray-200 text-gray-400' : 'bg-indigo-700'}"
            >
                Continue
            </button>
        </div>
    </form>
</div>