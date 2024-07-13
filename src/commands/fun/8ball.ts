import type { Command } from "#interfaces/index.js";
import axios from "axios";
import { EmbedBuilder } from "discord.js";

interface Response8ball {
  response: string;
  url: string;
}

export const command: Command = {
  name: "8ball",
  description: "Test your luck",
  run: async (client, interaction) => {
    await interaction.deferReply();

    const response = (
      await axios.get<Response8ball>("https://nekos.life/api/v2/8ball")
    ).data;

    const embed = new EmbedBuilder()
      .setColor(client.env.BOT_COLOR)
      .setTitle(response.response)
      .setImage(response.url);

    return await interaction.followUp({ embeds: [embed] });
  }
};
