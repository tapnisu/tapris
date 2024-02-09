import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  Guild,
  OAuth2Scopes
} from "discord.js";
import { createGuild, getGuild } from "../db.js";
import { Event } from "../interfaces/index.js";
import getLocale from "../locales/index.js";

export const event: Event = {
  name: "guildCreate",
  run: async (client, guild: Guild) => {
    const date = new Date().toLocaleString("en-US", {
      day: "2-digit",
      year: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    console.log(`[${date}] Joined ${guild.name} guild!`);

    if (!(await getGuild(guild.id))) await createGuild(guild.id);
    if (!guild.systemChannel) return;

    const link: string = client.generateInvite({
      scopes: [OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands],
      permissions: [
        "KickMembers",
        "BanMembers",
        "PrioritySpeaker",
        "ViewChannel",
        "SendMessages",
        "ManageMessages",
        "AttachFiles",
        "ReadMessageHistory",
        "Connect",
        "Speak",
        "UseApplicationCommands",
        "ManageThreads",
        "SendMessagesInThreads"
      ]
    });

    const { guildCreateLocale } = await getLocale(guild.id);

    const buttonsRow = new ActionRowBuilder<ButtonBuilder>().addComponents([
      new ButtonBuilder()
        .setURL(link)
        .setLabel(guildCreateLocale.invite)
        .setStyle(ButtonStyle.Link)
    ]);

    const embed = new EmbedBuilder()
      .setColor(client.env.BOT_COLOR)
      .setTitle(client.user.username)
      .setThumbnail(client.user.displayAvatarURL({ forceStatic: false }))
      .setDescription(guildCreateLocale.description);

    return guild.systemChannel.send({
      embeds: [embed],
      components: [buttonsRow]
    });
  }
};
