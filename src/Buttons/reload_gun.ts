import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} from "discord.js";
import { Button } from "../Interfaces/index.js";
import getLocale from "../Locales/index.js";
import { getGuild, updateGuild } from "../db.js";

export const button: Button = {
  customId: /reload_gun/,
  run: async (client, interaction) => {
    const guild = await getGuild(interaction.guildId);

    const { gunLocale } = await getLocale(interaction.guildId);

    guild.gun = [false, false, false, false, false, false];
    guild.gun[Math.floor(Math.random() * 6)] = true;

    await updateGuild(guild);

    const embed = new EmbedBuilder()
      .setColor(client.env.BOT_COLOR)
      .setTitle(gunLocale.reloadedGun);

    const buttonsRow = new ActionRowBuilder<ButtonBuilder>().addComponents([
      new ButtonBuilder()
        .setCustomId("gun_shoot")
        .setLabel(gunLocale.shoot)
        .setStyle(ButtonStyle.Primary)
    ]);

    return await interaction.update({
      embeds: [embed],
      components: [buttonsRow]
    });
  }
};
