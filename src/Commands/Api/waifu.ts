import { EmbedBuilder } from "discord.js";
import WaifuClient from "waifu.js";
import { Command } from "../../Interfaces/index.js";

const waifuClient = new WaifuClient();

export const command: Command = {
  name: "waifu",
  description: "Get waifus images",
  disabled: true,
  run: async (client, interaction) => {
    await interaction.deferReply();

    const Embed = new EmbedBuilder()
      .setColor(client.env.BOT_COLOR)
      .setImage(await waifuClient.sfw.waifu());

    return await interaction.followUp({ embeds: [Embed] });
  }
};
