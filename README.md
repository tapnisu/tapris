<p align="center">
 <img width=400px src="assets/avatar.png" alt="Bot logo">
 <h1 align="center">Tapris</h1>
 <h3 align="center">Multipurpose discord bot</h3>
</p>

<p align="center">
 <a href="#overview">Overview</a>,
 <a href="#invite">Invite</a>,
 <a href="#Run%20bot%20your%20self">Run bot your self</a>
</p>

## Overview

Tapris is a `discord.js` bot, made in `TypeScript`. Bot is named after Tapris
from Gabriel DropOut manga.

## Invite

You can invite the bot by
[this link](https://discord.com/api/oauth2/authorize?client_id=869088074758520832&scope=bot+applications.commands&permissions=294208515334).
Type "/" to see commands!

## Host

1. Create bot -
   [Discord developer portal](https://discord.com/developers/applications).

2. Install [node.js](https://nodejs.org/en/download/) (I recommend using LTS).

3. Install [yarn](https://yarnpkg.com/) - `npm i -g yarn`

4. (Windows) Install `Visual Studio Build Tools`

5. Set up your [.env](.env.sample) (sample in [.env.sample](.env.sample)).

```env
TOKEN="DISCORD_BOT_TOKEN"
BOT_COLOR="#abb1c2"
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

6. Install dependencies - `yarn`.

7. Build bot - `yarn build`.

8. Start bot - `yarn start`.

9. I recommend using bot via pm2 - `npm i -g pm2`

10. Start bot via pm2 - `yarn start:pm2`

Now you have a running bot!
