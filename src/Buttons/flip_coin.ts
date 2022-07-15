import {
	CoinButtonsRowBuilder,
	CoinEmbedBuilder,
	choices,
	flipCoin
} from "../Exports/coin";

import { Button } from "../Interfaces";

export const button: Button = {
	customId: /flip_coin_(.*)/gi,
	run: async (client, interaction) => {
		const choice = interaction.customId.replace(/flip_coin_/, "");
		const embed = new CoinEmbedBuilder(
			flipCoin(choices),
			choice,
			choices,
			client.env.BOT_COLOR
		);
		const buttonsRow = new CoinButtonsRowBuilder(choices);

		return await interaction.update({
			embeds: [embed],
			components: [buttonsRow]
		});
	}
};
