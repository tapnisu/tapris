import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} from "discord.js";
import { Button } from "../interfaces/index.js";
import getLocale from "../locales/index.js";

export const button: Button = {
  customId: /password_(.*)/gi,
  run: async (client, interaction) => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#%";
    let password = "";

    const passwordLength = Number(
      interaction.customId.replace(/password_/, "")
    );

    for (let i = 0, n = charset.length; i < passwordLength; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }

    const { passwordLocale } = await getLocale(interaction.guildId);

    const buttonsRow = new ActionRowBuilder<ButtonBuilder>().addComponents([
      new ButtonBuilder()
        .setCustomId(`password_${passwordLength}`)
        .setLabel(passwordLocale.createNew)
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId("delete_message")
        .setLabel(passwordLocale.deleteMessage)
        .setStyle(ButtonStyle.Danger)
    ]);

    const embed = new EmbedBuilder()
      .setColor(client.env.BOT_COLOR)
      .setTitle(passwordLocale.password)
      .setDescription(password);

    return await interaction.update({
      embeds: [embed],
      components: [buttonsRow]
    });
  }
};
