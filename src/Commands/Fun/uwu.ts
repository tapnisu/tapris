import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'
import axios from 'axios'

export const command: Command = {
	name: 'uwu',
	description: 'Get UwU text',
	aliases: ['name'],
	run: async (client, message, args) => {
		if (args.length == 0)
			return message.channel.send(
				'You did not supply enough arguments :no_entry_sign:'
			)

		let response

		try {
			response = (
				await axios.get(
					`https://nekos.life/api/v2/owoify?text=${args.join('%20')}`
				)
			).data
		} catch {
			return message.channel.send('Error!')
		}

		const Embed = new MessageEmbed()
			.setColor(client.config.botColor)
			.setTitle(response.owo)

		return message.channel.send({ embeds: [Embed] })
	}
}
