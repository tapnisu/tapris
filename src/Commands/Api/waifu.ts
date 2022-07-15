import { Command } from "../../Interfaces";
import { EmbedBuilder } from "discord.js";
import WaifuClient from "waifu.js";

const waifuClient = new WaifuClient();

export const command: Command = {
	name: "waifu",
	description: "Get waifus images",
	run: async (client, interaction) => {
		const Embed = new EmbedBuilder()
			.setColor(client.env.BOT_COLOR)
			.setImage(await waifuClient.sfw.waifu());

		return await interaction.reply({ embeds: [Embed] });
	}
};
