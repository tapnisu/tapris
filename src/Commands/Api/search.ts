import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'
import { DuckduckgoResponse } from '../../Interfaces/Duckduckgo'
import axios from 'axios'

export const command: Command = {
	name: 'search',
	description: 'Get wikipedia data',
	aliases: ['query'],
	run: async (client, message, args) => {
		var response: DuckduckgoResponse = (
			await axios.get(
				`https://api.duckduckgo.com/?q=${encodeURI(args.join(' '))}&format=json`
			)
		).data

		const Embed = new MessageEmbed()
			.setColor(client.config.botColor)
			.setTitle(`Имя: ${response?.Heading}`)
			.setURL(response?.AbstractURL)
			.setDescription(response?.Abstract)
			.setThumbnail(`https://api.duckduckgo.com/${response?.Image}`)

		return message.channel.send({ embeds: [Embed] })
	}
}
