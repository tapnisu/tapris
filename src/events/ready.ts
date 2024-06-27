import { createGuild, getGuild } from "#db/index.js";
import type { Event } from "#interfaces/index.js";
import type { ApplicationCommandDataResolvable } from "discord.js";

export const event: Event = {
  name: "ready",
  run: (client) => {
    client.guilds.cache.forEach(async (guild) => {
      if (!(await getGuild(guild.id))) await createGuild(guild.id);
    });

    client.user.setActivity("Oh, hi!");

    client.commands.forEach((command) =>
      client.application?.commands?.create(
        command as ApplicationCommandDataResolvable
      )
    );

    console.log(`${client.user.tag} is up!`);
  }
};
