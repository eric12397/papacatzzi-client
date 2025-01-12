<script lang="ts">
	import BeginSignUp from "./BeginSignUp.svelte";
	import FinishSignUp from "./FinishSignUp.svelte";
	import VerifySignUp from "./VerifySignUp.svelte";

    let email = $state("")
    let currentStep = $state(1)

    let { close }: { close: () => void } = $props()

    const nextStep = () => {
        currentStep++
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

    <div class="flex flex-col h-full">
        {#if currentStep == 1}
        <BeginSignUp bind:email={email} {nextStep} />

        {:else if currentStep == 2}
        <VerifySignUp {email} {nextStep} />

        {:else if currentStep == 3}
        <FinishSignUp {email} {close} />

        {/if}
    </div>
</div>
