<script lang="ts">
	import { goto } from "$app/navigation";

    let username = $state("")
    let password = $state("")

    let { email, close }: { email: string, close: () => void } = $props()

    const handleSubmit = async () => {
        try {
            const body: FinishSignUpRequest = {email, username, password}
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/signup/finish`, {
                method: "POST",
                body:  JSON.stringify(body),
            });
            
            if (!response.ok) {
                throw new Error(`Failed to signup new user: ${response.statusText}`);
            }

            close()
            goto("/login")
        } catch (error) {
            console.error('Error signing up new user:', error);
            throw error;
        }
    }
</script>

<h2 class="text-xl font-bold mb-4">Enter a unique username and password</h2>

<div class="space-y-4">
    <input
        type="text"
        placeholder="Username"
        class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        bind:value={username}
    />

    <input
        type="password"
        placeholder="Password"
        class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        bind:value={password}
    />
</div>

<div class="mt-auto">
    <button
        type="submit"
        onclick={handleSubmit}
        disabled={!username || !password}
        class="w-full text-white py-2 px-4 rounded-full 
        {!username || !password ? 'bg-gray-200 text-gray-400' : 'bg-indigo-700'}"
    >
        Sign Up
    </button>
</div>