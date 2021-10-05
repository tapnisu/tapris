import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'

export const command: Command = {
	name: 'touri',
	description: 'Translate text into URI',
	aliases: ['text'],
	run: async (client, message, args) => {
		const Embed = new MessageEmbed()
			.setColor(client.config.botColor)
			.setTitle(encodeURI(args.join(' ')))
			.addField('Original text', args.join(' '), true)

		return message.channel.send({ embeds: [Embed] })
	}
}
