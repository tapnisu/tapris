<p align="center">
 <img width=400px src="assets/avatar.png" alt="Bot logo">
 <h1 align="center">Tapris</h1>
 <h3 align="center">Multipurpose discord bot</h3>
</p>

<p align="center">
 <a href="#overview">Overview</a>,
 <a href="#invite">Invite</a>,
 <a href="#host">Host</a>
</p>

## Overview

Tapris is a Discord bot, made in TypeScript. Named after Tapris
from Gabriel DropOut manga.

## How to use

You can invite the bot by
[this link](https://discord.com/api/oauth2/authorize?client_id=869088074758520832&scope=bot+applications.commands&permissions=294208515334).
Type "/" to see commands!

## Used technologies

- NodeJS
- TypeScript
- Discord.js
- Prisma ORM


## Contribute

1. Create bot on a [Discord developer portal](https://discord.com/developers/applications).

2. Install [Node.js](https://nodejs.org/en/download).

3. Install [pnpm](https://pnpm.io/installation).

4. (Windows) Install [Visual Studio Build Tools](https://visualstudio.microsoft.com/downloads/?q=build+tools#build-tools-for-visual-studio-2022).

5. (Linux) Install `python3`, `ffmpeg`, `pkg-config`, `libsodium`, `libtool`, `autoconf`, `automake`, `binutils`.

6. Set up your [.env](.env.sample) (sample in [.env.sample](.env.sample)):

   ```env
   TOKEN="DISCORD_BOT_TOKEN"
   BOT_COLOR="#abb1c2"
   DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
   ```

7. Install dependencies:

   ```sh
   pnpm install
   ```

8. Migrate your database using prisma:

   ```sh
   pnpm prisma:migrate
   ```

9. Build bot:

   ```sh
   pnpm build
   ```

10. Start bot:

    ```sh
    pnpm start
    ```

11. Or you can start bot using pm2:

    ```sh
    pnpm pm2:start
    ```

Now you have a running bot!
