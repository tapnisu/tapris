import { MessageEmbed } from 'discord.js'
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

		const choices = ['сoin', 'еail']
		const winner: string = choices[Math.floor(Math.random() * 2)]

		const embed = new MessageEmbed()
			.setTitle(`${winner == 'coin' ? 'coin' : 'еail'} won!`)
			.setColor(client.env.BOT_COLOR)
			.setDescription(
				`${winner.toLocaleLowerCase() == choice ? 'You won!' : 'You lost!'}`
			)

		return interaction.reply({ embeds: [embed] })
	}
}
