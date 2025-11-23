// src/config/build.ts
/**
 * Build-time configuration.
 */
export const BUILD_CONFIG = {
    VERSION: '1.0.0',
    COMMIT_HASH: import.meta.env.VITE_COMMIT_HASH || 'dev',
    BUILD_DATE: new Date().toISOString(),
};
