// src/utils/logger.ts
/**
 * Simple client-side logger wrapper.
 * In production, this could send logs to a remote service.
 */
export const logger = {
    info: (message: string, ...args: any[]) => {
        console.info(`[INFO] ${message}`, ...args);
    },
    warn: (message: string, ...args: any[]) => {
        console.warn(`[WARN] ${message}`, ...args);
    },
    error: (message: string, ...args: any[]) => {
        console.error(`[ERROR] ${message}`, ...args);
    },
    debug: (message: string, ...args: any[]) => {
        if (import.meta.env.DEV) {
            console.debug(`[DEBUG] ${message}`, ...args);
        }
    },
};
