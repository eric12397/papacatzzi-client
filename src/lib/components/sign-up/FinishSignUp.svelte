<script lang="ts">
	import { goto } from "$app/navigation";

    let username = $state("")
    let password = $state("")

    let { email, close }: { email: string, close: () => void } = $props()

    const handleSubmit = async () => {
        try {
            const body: FinishSignUp = {email, username, password}
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/signup/finish`, {
                method: "POST",
                body:  JSON.stringify(body),
            });
            
            if (!response.ok) {
                throw new Error(`Failed to signup new user: ${response.statusText}`);
            }

            close()
            goto("/maps")
        } catch (error) {
            console.error('Error signing up new user:', error);
            throw error;
        }
    }
</script>

<form>
    <div>
        <label class="text-sm font-medium text-gray-700">Username</label>
        <input
            placeholder="Enter your username"
            class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            bind:value={username}
        />
    </div>

    <div>
        <label class="text-sm font-medium text-gray-700">Password</label>
        <input
            type="password"
            placeholder="Enter your password"
            class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            bind:value={password}
        />
    </div>
</form>

<div class="mt-auto">
    <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        onclick={handleSubmit}
    >
        Sign Up
    </button>
</div>