import "dotenv/config";

function requiredEnv(key: string): string {
    const value = process.env[key];
    if (!value) throw new Error(`Missing environment variable: ${key}`);

    return value;
}

export const DISCORD_TOKEN = requiredEnv("DISCORD_TOKEN");
