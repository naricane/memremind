export type Env = Record<string, string | undefined>;

export function required(env: Env, key: string): string {
    const value = env[key];
    if (!value) {
        throw new Error(`${key} is not set`);
    }
    return value;
}
