import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} from "discord.js";
import { Button } from "../interfaces/index.js";
import { choices } from "../lib/coin.js";
import getLocale from "../locales/index.js";

export const button: Button = {
  customId: /flip_coin_(.*)/gi,
  run: async (client, interaction) => {
    const choice = interaction.customId.replace(/flip_coin_/, "");
    const { coinLocale } = await getLocale(interaction.guildId);

    const embed = new EmbedBuilder()
      .setTitle(
        coinLocale.winner(
          choice == choices[0] ? coinLocale.choices[0] : coinLocale.choices[1]
        )
      )
      .setColor(client.env.BOT_COLOR)
      .setDescription(
        `${
          choice.toLocaleLowerCase() == choice
            ? coinLocale.youWon
            : coinLocale.youLost
        }`
      );

    const buttonsRow = new ActionRowBuilder<ButtonBuilder>().addComponents([
      new ButtonBuilder()
        .setCustomId(`flip_coin_${choices[0]}`)
        .setLabel(coinLocale.select(coinLocale.choices[0]))
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId(`flip_coin_${choices[1]}`)
        .setLabel(coinLocale.select(coinLocale.choices[1]))
        .setStyle(ButtonStyle.Primary)
    ]);

    return await interaction.update({
      embeds: [embed],
      components: [buttonsRow]
    });
  }
};
