import type { DuckduckgoResponse } from "#interfaces/duckDuckGo.js";
import type { Command } from "#interfaces/index.js";
import axios from "axios";
import { EmbedBuilder } from "discord.js";

export const command: Command = {
  name: "search",
  description: "Get data from internet",
  options: [
    {
      name: "text",
      description: "Text to be searched",
      type: 3,
      required: true
    }
  ],
  disabled: true,
  run: async (client, interaction) => {
    const text = interaction.options.getString("text");

    const response: DuckduckgoResponse = (
      await axios.get(
        `https://api.duckduckgo.com/?q=${encodeURI(text)}&format=json`
      )
    ).data;

    if (!response.Results[0])
      return await interaction.reply({
        content: "Can't find results! :no_entry_sign:",
        ephemeral: true
      });

    await interaction.deferReply();

    const embed = new EmbedBuilder()
      .setColor(client.env.BOT_COLOR)
      .setTitle(response.Results[0].FirstURL)
      .setURL(response.Results[0].FirstURL);

    return await interaction.followUp({ embeds: [embed] });
  }
};
