import { createGuild, getGuild } from "#db/index.js";
import { Event } from "#interfaces/index.js";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  Guild,
  OAuth2Scopes
} from "discord.js";

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

    const link = client.generateInvite({
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

    const guildEntry = await getGuild(guild.id);
    client.i18n.setLocale(guildEntry.lang);

    const buttonsRow = new ActionRowBuilder<ButtonBuilder>().addComponents([
      new ButtonBuilder()
        .setURL(link)
        .setLabel(client.i18n.__("invite"))
        .setStyle(ButtonStyle.Link)
    ]);

    const embed = new EmbedBuilder()
      .setColor(client.env.BOT_COLOR)
      .setTitle(client.user.username)
      .setThumbnail(client.user.displayAvatarURL({ forceStatic: false }))
      .setDescription(client.i18n.__("guildCreate_description"));

    return guild.systemChannel.send({
      embeds: [embed],
      components: [buttonsRow]
    });
  }
};
