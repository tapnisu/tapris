import type { Command } from "#interfaces/index.js";
import getLocale from "#locales/index.js";
import { EmbedBuilder } from "discord.js";

export const command: Command = {
  name: "guild",
  description: "Get info about guild",
  guildsOnly: true,
  run: async (client, interaction) => {
    await interaction.deferReply();
    const { guildLocale } = await getLocale(interaction.guildId);

    const embed = new EmbedBuilder()
      .setColor(client.env.BOT_COLOR)
      .setTitle(interaction.guild.name)
      .setThumbnail(
        `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.png`
      )
      .setDescription(
        interaction.guild.description ?? guildLocale.noDescription
      )
      .addFields([
        {
          name: guildLocale.owner,
          value: `<@!${interaction.guild.ownerId}>`,
          inline: true
        },
        {
          name: guildLocale.memberCount,
          value: interaction.guild.memberCount.toString(),
          inline: true
        },
        {
          name: guildLocale.emojis,
          value: interaction.guild.emojis.cache.size.toString(),
          inline: true
        },
        {
          name: guildLocale.roles,
          value: (interaction.guild.roles.cache.size - 1).toString(),
          inline: true
        },
        {
          name: guildLocale.stickers,
          value: (interaction.guild.stickers.cache.size - 1).toString(),
          inline: true
        },
        { name: guildLocale.id, value: interaction.guild.id, inline: true }
      ]);

    return await interaction.followUp({ embeds: [embed] });
  }
};
