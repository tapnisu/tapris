<p align="center">
 <img width=400px src="assets/avatar.png" alt="Bot logo">
 <h1 align="center">Tapris</h1>
 <h3 align="center">Multipurpose discord bot</h3>
</p>

<p align="center">
 <a href="#overview">Overview</a>,
 <a href="#install">Install</a>
</p>

## Overview

Tapris is a `discord.js` bot, made in `TypeScript`.
Bot is named after Tapris from Gabriel DropOut manga.

## Install

### Already hosted

You can invite the bot by [this link](https://discord.com/api/oauth2/authorize?client_id=869088074758520832&scope=bot+applications.commands&permissions=294208515334).
Type "/" to see commands!

### Host yourself

1. Create bot - [Discord developer portal](https://discord.com/developers/applications).

2. Install [node.js](https://nodejs.org/en/download/) (I recommend using LTS).

3. Install [yarn](https://yarnpkg.com/) - `npm i -g yarn`

4. Set up your [.env](.env.sample) (example in [.env.sample](.env.sample)).

```env
TOKEN="bot token"
BOT_COLOR="bot color (#a4b9f9)"
```

5. Install dependencies - `yarn`.

6. Build bot - `yarn build`.

7. Start bot - `yarn start`.

8. I recommend using bot via pm2 - `npm i -g pm2`

9. Start bot via pm2 -

Now you have a running bot!
