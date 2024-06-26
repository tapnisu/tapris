import { getGuild, updateGuild } from "#db/index.js";
import type { Component } from "#interfaces/index.js";
import getLocale from "#locales/index.js";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} from "discord.js";

export const button: Component = {
  customId: /gun_shoot/,
  run: async (client, interaction) => {
    const guild = await getGuild(interaction.guildId);

    const { gunLocale } = await getLocale(interaction.guildId);

    if (guild.gun.length == 0) {
      const embed = new EmbedBuilder()
        .setColor(client.env.BOT_COLOR)
        .setTitle(gunLocale.emptyGun);

      const buttonsRow = new ActionRowBuilder<ButtonBuilder>().addComponents([
        new ButtonBuilder()
          .setCustomId("reload_gun")
          .setLabel(gunLocale.reloadGun)
          .setStyle(ButtonStyle.Primary)
      ]);

      return await interaction.update({
        embeds: [embed],
        components: [buttonsRow]
      });
    }

    const embed = new EmbedBuilder().setColor(client.env.BOT_COLOR);

    const buttonsRow = new ActionRowBuilder<ButtonBuilder>().addComponents([
      new ButtonBuilder()
        .setCustomId("gun_shoot")
        .setLabel(gunLocale.shoot)
        .setStyle(ButtonStyle.Primary)
    ]);

    if (guild.gun[0]) embed.setTitle(gunLocale.youDied);
    if (!guild.gun[0]) embed.setTitle(gunLocale.nothingHappened);

    guild.gun.shift();
    await updateGuild(guild);

    return await interaction.update({
      embeds: [embed],
      components: [buttonsRow]
    });
  }
};
