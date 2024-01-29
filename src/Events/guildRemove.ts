import { Guild } from "discord.js";
import { Event } from "../Interfaces";
import { deleteGuild } from "../db";

export const event: Event = {
  name: "guildDelete",
  run: async (_client, guild: Guild) => {
    const date = new Date().toLocaleString("en-US", {
      day: "2-digit",
      year: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    await deleteGuild(guild.id);

    console.log(`[${date}] Left ${guild.name} guild!`);
  }
};
