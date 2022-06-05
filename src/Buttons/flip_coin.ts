import { Button } from '../Interfaces'
import {
	choices,
	CoinButtonsRowBuilder,
	CoinEmbedBuilder,
	flipCoin
} from '../Exports/coin'

export const button: Button = {
	customId: /flip_coin_(.*)/gi,
	run: async (client, interaction) => {
		const choice = interaction.customId.replace(/flip_coin_/, '')
		const embed = new CoinEmbedBuilder(
			flipCoin(choices),
			choice,
			choices,
			client.env.BOT_COLOR
		)
		const buttonsRow = new CoinButtonsRowBuilder(choices)

		return interaction.update({
			embeds: [embed],
			components: [buttonsRow]
		})
	}
}
