<script lang="ts">
    let form = $state<CreateUser>({
        username: "",
        email: "",
        password: "",
    })

    let { close }: { close: () => void } = $props()

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/signup`, {
                method: "POST",
                body:  JSON.stringify(form),
            });
            
            if (!response.ok) {
                throw new Error(`Failed to signup new user: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error signing up new user:', error);
            throw error;
        }
    }
</script>

<div 
    class="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-[1000]"
    onclick={close}
/>

<!-- Modal content -->
<div
    class="flex flex-col w-full h-full fixed bg-white p-6 z-[1001]
    md:w-96 md:h-[600px] md:rounded-lg md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
>
    
    <h2 class="text-xl font-bold mb-4">Sign Up</h2>
    <button
        onclick={close}
        aria-label="Close post"
        class="absolute top-3 right-3 w-8 h-8"
    >
        X
    </button>

    <form class="flex flex-col h-full" onsubmit={handleSubmit}>
        <div class="space-y-2">
            <div>
                <label class="text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    bind:value={form.email}
                />
            </div>
            <div>
                <label class="text-sm font-medium text-gray-700">Username</label>
                <input
                    placeholder="Enter your username"
                    class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    bind:value={form.username}
                />
            </div>
            <div>
                <label class="text-sm font-medium text-gray-700">Password</label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    bind:value={form.password}
                />
            </div>
            
            <div>
                <small>Already have an account? <a>Log In</a></small>
            </div>
        </div>
        

        <div class="mt-auto">
            <button
                type="submit"
                class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                Sign Up
            </button>
        </div>
    </form>
</div>
