import { Command } from '../../Interfaces'
import { EmbedBuilder } from 'discord.js'

export const command: Command = {
	name: 'touri',
	description: 'Translate text into URI',
	options: [
		{
			name: 'text',
			description: 'Text to be coded',
			type: 3,
			required: true
		}
	],
	run: async (client, interaction) => {
		const text = interaction.options.getString('text')

		const Embed = new EmbedBuilder()
			.setColor(client.env.BOT_COLOR)
			.setTitle(encodeURI(text))
			.addFields([{name: 'Original text', value: text, inline: true}])

		return interaction.reply({ embeds: [Embed] })
	}
}
