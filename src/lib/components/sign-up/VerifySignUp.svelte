<script lang="ts">
    let code = $state("")
    let { email, nextStep }: { email: string, nextStep: () => void } = $props()

    const handleSubmit = async () => {
        try {
            const body: VerifySignUp = {email, code}
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/signup/verify`, {
                method: "POST",
                body:  JSON.stringify(body),
            });
            
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

<form>
    <div>
        <label class="text-sm font-medium text-gray-700">Code</label>
        <input
            placeholder="Enter your verification code"
            class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            bind:value={code}
        />
    </div>
</form>

<div class="mt-auto">
    <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        onclick={handleSubmit}
    >
        Continue
    </button>
</div>