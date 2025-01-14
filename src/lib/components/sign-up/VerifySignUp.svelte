<script lang="ts">
    let code = $state("")
    let { 
        email = $bindable(),
        requestVerificationCode,
        nextStep 
    }: { 
        email: string,
        requestVerificationCode: () => void,
        nextStep: () => void 
    } = $props()

    const handleSubmit = async () => {
        try {
            const body: VerifySignUpRequest = {email, code}
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

    const onKeyUp = (event: any) => {
        if (event.target.value.length === 6) handleSubmit() 
    }
</script>

<h2 class="text-xl font-bold mb-4">Verify your email</h2>
<small class="mb-4">Enter the verification code that was sent to {email}.</small>

<input
    type="text"
    maxlength="6"
    bind:value={code}
    onkeyup={onKeyUp}
    placeholder="Code"
    class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
/>
<div>
    <small>Didn't get an email? <a class="cursor-pointer text-blue-600" onclick={requestVerificationCode}>Resend</a></small>
</div>

<div class="mt-auto">
    <button
        type="submit"
        onclick={handleSubmit}
        disabled={code === ""}
        class="w-full text-white py-2 px-4 rounded-full 
        {code === "" ? 'bg-gray-200 text-gray-400' : 'bg-indigo-700'}"
    >
        Continue
    </button>
</div>