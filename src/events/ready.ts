import { ApplicationCommandDataResolvable } from "discord.js";
import { createGuild, getGuild } from "../db.js";
import { Event } from "../interfaces/index.js";

export const event: Event = {
  name: "ready",
  run: (client) => {
    client.guilds.cache.forEach(async (guild) => {
      if (!(await getGuild(guild.id))) await createGuild(guild.id);
    });

    client.user.setActivity("Type '/' to check bot commands!");

    const commands = client.application?.commands;

    client.commands.forEach((command) => {
      commands?.create(command as ApplicationCommandDataResolvable);
    });

    console.log(`${client.user.tag} is up!`);
  }
};
