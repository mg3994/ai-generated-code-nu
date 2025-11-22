// src/jet/dependencies/net.ts
/**
 * Minimal network abstraction used by intents.
 * In a real app this would wrap fetch with retries, auth, etc.
 */
export async function apiGet<T>(url: string): Promise<T> {
    const response = await fetch(url, { credentials: 'include' });
    if (!response.ok) {
        throw new Error(`Network error: ${response.status}`);
    }
    return (await response.json()) as T;
}
