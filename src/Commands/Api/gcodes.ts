import { Code } from "../../Interfaces/GIPN";
import { Command } from "../../Interfaces";
import { EmbedBuilder } from "discord.js";
import axios from "axios";

export const command: Command = {
	name: "gcodes",
	description: "Codes for Genshin Impact",
	run: async (client, interaction) => {
		const response: Code[] = (
			await axios.get(
				"https://raw.githubusercontent.com/ataraxyaffliction/gipn-json/main/gipn.json"
			)
		).data.CODES;

		const Embed = new EmbedBuilder()
			.setColor(client.env.BOT_COLOR)
			.setTitle("Genshin codes")
			.setDescription("You can activate them in game, and get rewards!")
			.setURL("https://genshin.mihoyo.com/en/gift");

		response.forEach((code) => {
			if (code.is_expired == false) {
				let rewards: string[] = [];

				code.reward_array.forEach((reward) => {
					rewards = [...rewards, `${reward.name}: ${reward.count}`];
				});

				Embed.addFields([
					{ name: code.code, value: rewards.join("\n"), inline: true }
				]);
			}
		});

		return await interaction.reply({ embeds: [Embed] });
	}
};
