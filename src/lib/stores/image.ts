import { writable } from 'svelte/store';

export type ImageData = {
    src: string;
    latitude: number;
    longitude: number;
    timestamp: number;
}

export const imageStore = writable<ImageData | null>(null);