import type { Command } from "#interfaces/index.js";
import { EmbedBuilder } from "discord.js";
import WaifuClient from "waifu.js";

const waifuClient = new WaifuClient();

export const command: Command = {
  name: "waifu",
  description: "Get waifus images",
  disabled: true,
  run: async (client, interaction) => {
    await interaction.deferReply();

    const embed = new EmbedBuilder()
      .setColor(client.env.BOT_COLOR)
      .setImage(await waifuClient.sfw.waifu());

    return await interaction.followUp({ embeds: [embed] });
  }
};
