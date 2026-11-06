import { Command } from "@sapphire/framework";
import { EmbedBuilder } from "discord.js";

const COMMAND_NAME = "data-dump";
const COMMAND_DESCRIPTION = "Shows how to make a full data dump for a TornTools developer";
const DATA_DUMP_COLOR = 0x00a500;

const DATA_DUMP_URL =
    "https://github.com/Mephiles/torntools_extension/wiki/FAQ#one-of-the-developers-asks-me-to-do-a-full-data-dump-how-can-i-do-that";

const FULL_OPTION_NAME = "full";
const FULL_OPTION_DESCRIPTION = "Show the unreduced variant, DebugFunctions.fullDataDump(false)";

const DATA_DUMP_FOOTER =
    "API keys are redacted automatically but it still contains other data you don't want public. Only share the file with a TornTools developer.";

/** Pure builder so the guide content lives in exactly one place. */
function buildDataDumpEmbed({ full }: { full: boolean }): EmbedBuilder {
    return new EmbedBuilder()
        .setColor(DATA_DUMP_COLOR)
        .setTitle("🗂️ How to do a full data dump")
        .setDescription(
            `A developer asked you for your TornTools data. The official guide is in the [FAQ](${DATA_DUMP_URL}).`,
        )
        .addFields(
            {
                name: ":one: Open the TornTools settings",
                value: "Open the TornTools popup and go to the settings page. Do **NOT** use the settings link in the sidebar!",
            },
            {
                name: ":two: Open the devtools console",
                value: "Press `F12` and switch to the **Console** tab.",
            },
            {
                name: ":three: Run this command in the console tab",
                value: [
                    "```js",
                    full ? "DebugFunctions.fullDataDump(false)" : "DebugFunctions.fullDataDump()",
                    "```",
                ].join("\n"),
            },
            {
                name: ":four: Download and share the file",
                value: "`torntools-full-data-dump.json` downloads automatically. If it doesn't, go back to the settings page and finish the download process there. Then attach the file where the developer asked for it.",
            },
        )
        .setFooter({ text: DATA_DUMP_FOOTER });
}

export class DataDumpCommand extends Command {
    public constructor(context: Command.LoaderContext, options: Command.Options) {
        super(context, {
            ...options,
            name: COMMAND_NAME,
            description: COMMAND_DESCRIPTION,
            preconditions: ["GuildOnly"],
        });
    }

    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerChatInputCommand((builder) =>
            builder
                .setName(COMMAND_NAME)
                .setDescription(COMMAND_DESCRIPTION)
                .setDefaultMemberPermissions(null)
                .addBooleanOption((option) =>
                    option
                        .setName(FULL_OPTION_NAME)
                        .setDescription(FULL_OPTION_DESCRIPTION)
                        .setRequired(false),
                ),
        );
    }

    public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        const full = interaction.options.getBoolean(FULL_OPTION_NAME) ?? false;

        await interaction.reply({ embeds: [buildDataDumpEmbed({ full })] });
    }
}
