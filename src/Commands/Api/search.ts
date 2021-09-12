import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'
import axios from 'axios'

export const command: Command = {
	name: 'search',
	description: 'Get wikipedia data',
	aliases: ['query'],
	run: async (client, message, args) => {
		try {
			let response = (
				await axios.get(
					`https://api.duckduckgo.com/?q=${args.join('%20')}&format=json`
				)
			).data

			const Embed = new MessageEmbed()
				.setColor(client.config.botColor)
				.setTitle(`Имя: ${response.Heading}`)
				.setURL(response.AbstractURL)
				.setDescription(response.Abstract)
				.setThumbnail(`https://api.duckduckgo.com/${response.Image}`)

			return message.channel.send({ embeds: [Embed] })
		} catch {
			return message.channel.send('Error :no_entry_sign:')
		}
	}
}
