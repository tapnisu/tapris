import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'

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
		const text = interaction.data.options['text']

		const Embed = new MessageEmbed()
			.setColor(client.env.BOT_COLOR)
			.setTitle(encodeURI(text))
			.addField('Original text', text, true)

		return interaction.createMessage({ embeds: [Embed] })
	}
}
