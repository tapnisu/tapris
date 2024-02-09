import { Command } from "#interfaces/index.js";
import getLocale from "#locales/index.js";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} from "discord.js";

export const command: Command = {
  name: "lmgtfy",
  description: "Let Me Google That For You",
  options: [
    {
      name: "question",
      description: "Question to be searched",
      type: 3,
      required: true
    }
  ],
  disabled: true,
  run: async (client, interaction) => {
    await interaction.deferReply();
    const { lmgtfyLocale } = await getLocale(interaction.guildId);

    const question = interaction.options.getString("question");
    const link = `https://lmgtfy.app/?q=${encodeURI(
      question.replace(/ /g, "+")
    )}`;

    const buttonsRow = new ActionRowBuilder<ButtonBuilder>().addComponents([
      new ButtonBuilder()
        .setURL(link)
        .setLabel(lmgtfyLocale.openLink)
        .setStyle(ButtonStyle.Link)
    ]);

    const Embed = new EmbedBuilder()
      .setColor(client.env.BOT_COLOR)
      .setTitle(link)
      .setURL(link);

    return await interaction.followUp({
      embeds: [Embed],
      components: [buttonsRow]
    });
  }
};
