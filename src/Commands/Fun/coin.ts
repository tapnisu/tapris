import {
	CoinButtonsRowBuilder,
	CoinEmbedBuilder,
	choices,
	flipCoin
} from "../../Exports/coin";

import { Command } from "../../Interfaces";

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
		const choice = interaction.options.getString("choice");
		const embed = new CoinEmbedBuilder(
			flipCoin(choices),
			choice,
			choices,
			client.env.BOT_COLOR
		);
		const buttonsRow = new CoinButtonsRowBuilder(choices);

		return await interaction.reply({
			embeds: [embed],
			components: [buttonsRow]
		});
	}
};
