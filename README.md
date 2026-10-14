# TT Assistant

Discord bot for the Torn Tools community. Its `/bug-report` command posts a checklist of the
information a bug report must contain, so members know what to include before filing one.

## Add the bot to your server

[**Invite link**](https://discord.com/oauth2/authorize?client_id=1559938950225993872&permissions=19456&scope=bot+applications.commands)

Scopes requested: `bot` + `applications.commands` (the second scope registers the `/bug-report`
slash command).

## Permissions

The invite requests only the permissions the bot actually uses:

| Permission    | Bit       | Value   | Why the bot needs it               |
| ------------- | --------- | ------- | ---------------------------------- |
| View Channels | `1 << 10` | `1024`  | See the channels it posts in.      |
| Send Messages | `1 << 11` | `2048`  | Post the checklist.                |
| Embed Links   | `1 << 14` | `16384` | The checklist is sent as an embed. |
| **Total**     |           | `19456` |                                    |

The bot deliberately does **not** request `Manage Server`, `Manage Roles`, `Administrator`, or any
other elevated permission. It needs no privileged gateway intents.

## Self-hosting

1. Create a new application in the [Discord Developer Portal](https://discord.com/developers/applications)
   and name it **TT Assistant**.
2. On the **Bot** tab, click **Reset Token** and copy the token.
3. Invite the bot with the invite link above, substituting the application id from the
   **General Information** tab.
4. Install and run:

    ```bash
    bun install
    cp .env.example .env   # paste the token into DISCORD_TOKEN
    bun run dev
    ```

`/bug-report` is registered globally on startup; the first registration can take a while to show
up in Discord. Environment variables: `DISCORD_TOKEN`.

## Commands

| Command       | Purpose                                                                 |
| ------------- | ----------------------------------------------------------------------- |
| `/bug-report` | Post the bug report checklist. Open to everyone, usable in any channel. |

## Development

```bash
bun run check         # oxlint + oxfmt --check
bun run check:write   # auto-fix lint issues and formatting
```
