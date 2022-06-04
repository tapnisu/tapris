import { MessageActionRow, MessageButton, EmbedBuilder } from 'discord.js'
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

		const buttonsRow = new MessageActionRow().addComponents([
			new MessageButton()
				.setCustomId(`flip_coin_${choices[0]}`)
				.setLabel(`Select ${choices[0]}`)
				.setStyle('PRIMARY'),
			new MessageButton()
				.setCustomId(`flip_coin_${choices[1]}`)
				.setLabel(`Select ${choices[1]}`)
				.setStyle('PRIMARY')
		])

		return interaction.reply({ embeds: [embed], components: [buttonsRow] })
	}
}
