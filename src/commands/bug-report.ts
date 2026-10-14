import { Command } from "@sapphire/framework";
import { EmbedBuilder } from "discord.js";

const COMMAND_NAME = "bug-report";
const COMMAND_DESCRIPTION = "Shows what information a bug report should contain";
const BUG_REPORT_COLOR = 0x00a500;

const BUG_REPORT_FOOTER = "Bugs without this info usually can't be reproduced or fixed. Thanks!";

/** Pure builder so the checklist content lives in exactly one place. */
function buildBugReportEmbed(): EmbedBuilder {
    return new EmbedBuilder()
        .setColor(BUG_REPORT_COLOR)
        .setTitle("📋 How to report a bug")
        .setDescription("To help us find and fix your issue, please include all of this:")
        .addFields(
            {
                name: "Description of the problem",
                value: "What's going wrong, and what you expected to happen. A screenshot alone doesn't tell us what's wrong.",
            },
            { name: "Screenshots", value: "Show us what you're seeing." },
            { name: "TornTools Version", value: "What version of TornTools are you using?" },
            {
                name: "Feature Manager errors",
                value: "Include any errors the Feature Manager is showing (text or screenshot).",
            },
            {
                name: "Browser",
                value: "e.g. Chrome, Firefox, Edge, Safari, TornPDA (name + version if you know it).",
            },
            { name: "Device + OS", value: "e.g. PC with Windows 11, Android or iOS." },
        )
        .setFooter({ text: BUG_REPORT_FOOTER });
}

export class BugReportCommand extends Command {
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
                .setDefaultMemberPermissions(null),
        );
    }

    public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        await interaction.reply({ embeds: [buildBugReportEmbed()] });
    }
}
