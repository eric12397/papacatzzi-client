<script lang="ts">
    import { afterNavigate, goto } from '$app/navigation';
    let { data } = $props();

    let isOpen = $state(false);
    let isExpanded = $state(false);

    let touchStartY = $state(0)
    let touchEndY = $state(0)

    // TODO: may need to tweak
    const isMobile = !window.matchMedia('(hover: hover)').matches

    afterNavigate(() => {
        isOpen = true
        isExpanded = false
    })

    const toggleExpand = () => {
        isExpanded = !isExpanded
    }

    const close = () =>{
        isOpen = false
        isExpanded = false
    }

    const onTouchStart = (event: any) => {
        touchStartY = event.changedTouches[0].screenY
    }

    const onTouchEnd = (event: any) => {
        touchEndY = event.changedTouches[0].screenY
        
        // swipe up
        if (touchEndY < touchStartY) {
            if (isExpanded) {
                // scroll thru text content if overflow
            } else {
                toggleExpand()
            }
            return
        }

        // swipe down
        if (touchEndY > touchStartY) {
            if (isExpanded) {
                toggleExpand()
            } else {
                close()
            }
            return
        }
    }

    const timeAgo = (input: number): string => {
        const inputDate = new Date(input);
        const currentDate = new Date();
        const timeDifferenceInSeconds = Math.floor((currentDate.getTime() - inputDate.getTime()) / 1000);

        const intervals = new Map<string, number>()
        intervals.set("year", 31536000)
        intervals.set("month", 2592000)
        intervals.set("week", 604800)
        intervals.set("day", 86400)
        intervals.set("hour", 3600)
        intervals.set("minute", 60)

        for (const [key, value] of intervals) {
            const numberOfUnits = Math.floor(timeDifferenceInSeconds / value);
            if (numberOfUnits >= 1) {
                return `${numberOfUnits} ${key}${numberOfUnits > 1 ? 's' : ''} ago`;
            }
        }

        return 'just now';
    }

    const mobileEventListeners = (el: HTMLElement) => {
        if (isMobile) {
            el.addEventListener("click", toggleExpand)
            el.addEventListener("touchstart", onTouchStart)
            el.addEventListener("touchmove", (e) => e.preventDefault())
            el.addEventListener("touchend", onTouchEnd)
        }
    }

    let mobileContainer = $derived(
        `bottom-0 left-0 w-full rounded-t-lg transition-all duration-300
        ${isOpen && isExpanded ? "h-full" : 
          isOpen && !isExpanded ?  "h-96" : "h-0"}`
    )

    let desktopContainer = $derived(
        `top-0 left-0 h-full ${isOpen ? "w-96" : "hidden"}`
    )
</script>


<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    class={`z-index fixed bg-white shadow-lg
            ${isMobile ? mobileContainer : desktopContainer}`}

    use:mobileEventListeners
>
    <div class={`rounded-t-lg ${isMobile ? "overflow-hidden" : ""}`}>
        <img class="w-full max-h-64 object-cover"
            src={"/images/cat.jpg"}
            alt="Preview" 
            style=""  
        />
        <button
            onclick={close}
            aria-label="Close post"
            class="absolute top-3 right-3 w-8 h-8 
             rounded-full bg-white hover:bg-white transition"
        >
        X
        </button>
    </div>
    
    <div class={`py-3 px-5 ${isMobile && !isExpanded ? "h-24" : ""}`}>
        <!-- <small>{data.sighting.reporter}</small> -->
        <small class="text-gray-600">AnonymousUser19357275 · {timeAgo(data.sighting.timestamp)}</small>

        <!-- <h2>{data.sighting.animal}</h2> -->
        <p class={`${isMobile && !isExpanded ? "line-clamp-2" : ""}`}>{data.sighting.description}</p>
    </div>

    <div class="flex justify-around text-gray-600">
        <!-- <p>Posted {data.sighting.timestamp}</p> -->
        <small>Likes: 12k</small>
        <small>Comments: 356</small>
        <small>Shares: 1</small>
    </div>

    <!-- <div class="flex justify-center">
        No comments
    </div> -->
</div>
  
<style>
    .z-index {
        z-index: 1000;
    }
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>