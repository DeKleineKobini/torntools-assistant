import { SapphireClient } from "@sapphire/framework";
import { GatewayIntentBits } from "discord.js";
import { DISCORD_TOKEN } from "./config";

async function main(): Promise<void> {
    const client = new SapphireClient({
        intents: [GatewayIntentBits.Guilds],
        baseUserDirectory: __dirname,
        loadMessageCommandListeners: false,
    });

    await client.login(DISCORD_TOKEN);
}

main().catch((error) => {
    console.error("Failed to start:", error);
    process.exit(1);
});
