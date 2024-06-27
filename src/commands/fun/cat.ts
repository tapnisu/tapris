import type { Command } from "#interfaces/index.js";
import axios from "axios";
import { EmbedBuilder } from "discord.js";

interface CatResponse {
  cat: string;
}

interface CatApiResponse {
  breeds: unknown[];
  id: string;
  url: string;
  width: number;
  height: number;
}

export const command: Command = {
  name: "cat",
  description: "Get cat text and photo",
  run: async (client, interaction) => {
    await interaction.deferReply();

    const nekosResponse = (
      await axios.get<CatResponse>("https://nekos.life/api/v2/cat")
    ).data;
    const catApiResponse = (
      await axios.get<CatApiResponse>(
        "https://api.thecatapi.com/v1/images/search"
      )
    ).data;

    const Embed = new EmbedBuilder()
      .setColor(client.env.BOT_COLOR)
      .setTitle(nekosResponse.cat)
      .setImage(catApiResponse[0].url);

    return await interaction.followUp({ embeds: [Embed] });
  }
};
