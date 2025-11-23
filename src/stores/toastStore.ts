// src/stores/toastStore.ts
import { writable } from 'svelte/store';

export interface Toast {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
    duration?: number;
}

function createToastStore() {
    const { subscribe, update } = writable<Toast[]>([]);

    let nextId = 1;

    return {
        subscribe,
        show: (message: string, type: Toast['type'] = 'info', duration = 3000) => {
            const id = nextId++;
            const toast: Toast = { id, message, type, duration };

            update(toasts => [...toasts, toast]);

            if (duration > 0) {
                setTimeout(() => {
                    update(toasts => toasts.filter(t => t.id !== id));
                }, duration);
            }
        },
        dismiss: (id: number) => {
            update(toasts => toasts.filter(t => t.id !== id));
        },
        clear: () => {
            update(() => []);
        }
    };
}

export const toastStore = createToastStore();
