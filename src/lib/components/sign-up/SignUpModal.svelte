<script lang="ts">
	import BeginSignUp from "./BeginSignUp.svelte";
	import FinishSignUp from "./FinishSignUp.svelte";
	import VerifySignUp from "./VerifySignUp.svelte";

    let email = $state("")
    let currentStep = $state(1)

    let { close }: { close: () => void } = $props()

    const requestVerificationCode = async () => {
        const body: BeginSignUpRequest = {email}
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/signup/begin`, {
            method: "POST",
            body:  JSON.stringify(body),
        });

        return response
    }

    const nextStep = () => {
        currentStep++
    }

    const reset = () => {
        currentStep = 1
    }
</script>

<div 
    class="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-[1000]"
    onclick={close}
/>

<!-- Modal content -->
<div
    class="flex flex-col w-full h-full fixed bg-white z-[1001]
    md:w-[500px] md:h-[600px] md:rounded-lg md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
>
    
    <div class="flex px-4 pt-4 {currentStep == 1 ? "justify-end" : ""}">
        {#if currentStep == 1}
        <button
            onclick={close}
            aria-label="Close modal"
            class="w-4 h-8"
        >
        <i class="fa-solid fa-x"></i>
        </button>
        {/if}

        {#if currentStep == 2 || currentStep == 3}
        <button
            onclick={reset}
            aria-label="Previous step"
            class="w-4 h-8"
        >
        <i class="cursor-pointer fa-solid fa-arrow-left"></i>
        </button>
        {/if}
    </div>

    <div class="flex flex-col h-full pt-2 px-6 pb-6 md:px-24 md:pb-10">
        {#if currentStep == 1}
        <BeginSignUp bind:email={email} {requestVerificationCode} {nextStep} />

        {:else if currentStep == 2}
        <VerifySignUp {email} {requestVerificationCode} {nextStep} />

        {:else if currentStep == 3}
        <FinishSignUp {email} {close} />

        {/if}
    </div>
</div>
