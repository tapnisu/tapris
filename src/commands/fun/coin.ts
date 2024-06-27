import type { Command } from "#interfaces/index.js";
import { choices, flipCoin } from "#lib/coin.js";
import getLocale from "#locales/index.js";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} from "discord.js";

export const command: Command = {
  name: "coin",
  description: "Flip a coin",
  options: [
    {
      name: "choice",
      description: "Your selection",
      choices: [
        { name: "Coin", value: "coin" },
        { name: "Tail", value: "tail" }
      ],
      type: 3,
      required: true
    }
  ],
  run: async (client, interaction) => {
    await interaction.deferReply();

    const choice = interaction.options.getString("choice");
    const winner = flipCoin(choices);

    const { coinLocale } = await getLocale(interaction.guildId);

    const embed = new EmbedBuilder()
      .setTitle(coinLocale.winner(winner))
      .setColor(client.env.BOT_COLOR)
      .setDescription(
        choice == winner ? coinLocale.youWon : coinLocale.youLost
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

    return await interaction.followUp({
      embeds: [embed],
      components: [buttonsRow]
    });
  }
};
