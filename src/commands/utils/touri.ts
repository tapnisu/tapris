import { Command } from "#interfaces/index.js";
import { EmbedBuilder } from "discord.js";

export const command: Command = {
  name: "touri",
  description: "Translate text into URI",
  options: [
    {
      name: "text",
      description: "Text to be coded",
      type: 3,
      required: true
    }
  ],
  run: async (client, interaction) => {
    await interaction.deferReply();

    const text = interaction.options.getString("text");

    const embed = new EmbedBuilder()
      .setColor(client.env.BOT_COLOR)
      .setTitle(encodeURI(text))
      .setDescription(text);

    return await interaction.followUp({ embeds: [embed] });
  }
};
