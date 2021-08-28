import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'
import fetch from 'node-fetch'

export const command: Command = {
	name: 'search',
	description: 'Get wikipedia data',
	aliases: ['query'],
	run: async (client, message, args) => {
		let response = await (
			await fetch(
				`https://api.duckduckgo.com/?q=${args.join('%20')}&format=json`
			)
		).json()

		const Embed = new MessageEmbed()
			.setColor(client.config.botColor)
			.setTitle(`Имя: ${response.Heading}`)
			.setURL(response.AbstractURL)
			.setDescription(response.Abstract)
			.setThumbnail(`https://api.duckduckgo.com/${response.Image}`)

		return message.channel.send({ embeds: [Embed] })
	}
}
