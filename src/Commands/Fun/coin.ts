import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from 'discord.js'
import { Command } from '../../Interfaces'
import {
	choices,
	CoinButtonsRowBuilder,
	CoinEmbedBuilder,
	flipCoin
} from '../../Exports/coin'

export const command: Command = {
	name: 'coin',
	description: 'Flip a coin',
	options: [
		{
			name: 'choice',
			description: 'Your selection',
			choices: [
				{ name: 'Coin', value: 'coin' },
				{ name: 'Tail', value: 'tail' }
			],
			type: 3,
			required: true
		}
	],
	run: (client, interaction) => {
		const choice = interaction.options.getString('choice')
		const embed = new CoinEmbedBuilder(
			flipCoin(choices),
			choice,
			choices,
			client.env.BOT_COLOR
		)
		const buttonsRow = new CoinButtonsRowBuilder(choices)

		return interaction.followUp({ embeds: [embed], components: [buttonsRow] })
	}
}
