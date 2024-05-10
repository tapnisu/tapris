<p align="center">
 <img width=400px src="assets/avatar.png" alt="Tapris from Gabriel DropOut episode 5">
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

You can invite the bot using
[this link](https://discord.com/api/oauth2/authorize?client_id=869088074758520832&scope=bot+applications.commands&permissions=294208515334).

## Contribute

1. Create bot using [Discord developer portal](https://discord.com/developers/applications).

2. Install [Node.js](https://nodejs.org/en/download).

3. Install [pnpm](https://pnpm.io/) using [Corepack](https://nodejs.org/api/corepack.html):

   ```sh
   corepack enable
   pnpm install
   ```

4. Build dependencies:

   - (Windows) Install [Visual Studio Build Tools](https://visualstudio.microsoft.com/downloads/?q=build+tools#build-tools-for-visual-studio-2022).

   - (Linux) Install `python3`, `ffmpeg`, `pkg-config`, `libsodium`, `libtool`, `autoconf`, `automake`, `binutils`.

5. Set up your [.env](.env.sample) (sample in [.env.sample](.env.sample)):

   ```env
   TAPRIS_TOKEN="DISCORD_BOT_TOKEN"
   TAPRIS_DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
   ```

6. Install dependencies:

   ```sh
   pnpm install
   ```

7. Apply pending database migrations

   ```sh
   pnpm prisma migrate
   ```

8. Build bot:

   ```sh
   pnpm build
   ```

9. Start bot:

   ```sh
   pnpm start
   ```

Now you have a running bot!
