<script lang="ts">
    let email = $state("")
    let password = $state("")

    let { close }: { close: () => void } = $props()

    const handleSubmit = async () => {
        try {
            const body: LoginRequest = {email, password}
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
                method: "POST",
                body:  JSON.stringify(body),
            });
            
            if (!response.ok) {
                throw new Error(`Failed to log in: ${response.statusText}`);
            }

            close()
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }
</script>

<div class="flex px-4 pt-4 justify-end">
    <button
        onclick={close}
        aria-label="Close modal"
        class="w-4 h-8"
    >
    <i class="fa-solid fa-x"></i>
    </button>
</div>

<div class="flex flex-col h-full pt-2 px-6 pb-6 md:px-24 md:pb-10">
    <h2 class="text-xl font-bold mb-4">Log In</h2>

    <div class="space-y-4">
        <input
            type="email"
            placeholder="Email"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            bind:value={email}
        />

        <input
            type="password"
            placeholder="Password"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            bind:value={password}
        />
    </div>
    
    <div>
        <small>Don't have an account? <a>Sign Up</a></small>
    </div>
    
    <div class="mt-auto">
        <button
            type="submit"
            onclick={handleSubmit}
            disabled={!email || !password}
            class="w-full text-white py-2 px-4 rounded-full 
            {!email || !password ? 'bg-gray-200 text-gray-400' : 'bg-indigo-700'}"
        >
            Sign Up
        </button>
    </div>
</div>
