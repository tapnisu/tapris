import { ShardingManager } from "discord.js";
import config from "./core/env.js";

// Create sharding client
const manager = new ShardingManager("./dist/bot.js", {
  token: config.TOKEN
});

manager.on("shardCreate", (shard) => console.log(`Launched shard ${shard.id}`));

manager.spawn();
