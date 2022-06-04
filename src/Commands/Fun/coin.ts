import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from 'discord.js'
import { Command } from '../../Interfaces'

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

		const choices = ['сoin', 'tail']
		const winner: string = choices[Math.floor(Math.random() * 2)]

		const embed = new EmbedBuilder()
			.setTitle(`${winner == choices[0] ? choices[0] : choices[1]} won!`)
			.setColor(client.env.BOT_COLOR)
			.setDescription(
				`${winner.toLocaleLowerCase() == choice ? 'You won!' : 'You lost!'}`
			)

		const buttonsRow = new ActionRowBuilder().addComponents([
			new ButtonBuilder()
				.setCustomId(`flip_coin_${choices[0]}`)
				.setLabel(`Select ${choices[0]}`)
				.setStyle(ButtonStyle.Primary),
			new ButtonBuilder()
				.setCustomId(`flip_coin_${choices[1]}`)
				.setLabel(`Select ${choices[1]}`)
				.setStyle(ButtonStyle.Primary)
		])

		return interaction.reply({ embeds: [embed], components: [buttonsRow] })
	}
}
