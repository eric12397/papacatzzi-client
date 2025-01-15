<script lang="ts">
    let { 
        email = $bindable(),
        requestVerificationCode,
        nextStep 
    }: { 
        email: string,
        requestVerificationCode: () => Promise<Response>,
        nextStep: () => void 
    } = $props()

    const handleSubmit = async () => {
        try {
            const response = await requestVerificationCode()
            if (!response.ok) {
                throw new Error(`Failed to signup new user: ${response.statusText}`);
            }

            nextStep()
        } catch (error) {
            console.error('Error signing up new user:', error);
            throw error;
        }
    }
</script>

<h2 class="text-xl font-bold mb-4">Sign Up</h2>

<input
    type="email"
    placeholder="Email"
    class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    bind:value={email}
/>

<div>
    <small>Already have an account? <a>Log In</a></small>
</div>

<div class="mt-auto">
    <button
        type="submit"
        onclick={handleSubmit}
        disabled={email === ""}
        class="w-full text-white py-2 px-4 rounded-full 
        {email === "" ? 'bg-gray-200 text-gray-400' : 'bg-indigo-700'}"
    >
        Continue
    </button>
</div>