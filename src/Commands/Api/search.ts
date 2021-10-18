import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'
import { DuckduckgoResponse } from '../../Interfaces/Duckduckgo'
import axios from 'axios'
import { AxiosResponse } from '../../Interfaces/Axios'

export const command: Command = {
	name: 'search',
	description: 'Get wikipedia data',
	aliases: ['query'],
	run: async (client, message, args) => {
		const response: AxiosResponse = await axios.get(
			`https://api.duckduckgo.com/?q=${encodeURI(args.join(' '))}&format=json`
		)

		const responseData: DuckduckgoResponse = response.data

		const Embed = new MessageEmbed()
			.setColor(client.config.botColor)
			.setTitle(`Имя: ${responseData?.Heading}`)
			.setURL(responseData?.AbstractURL)
			.setDescription(responseData?.Abstract)
			.setThumbnail(`https://api.duckduckgo.com/${responseData?.Image}`)

		return message.channel.send({ embeds: [Embed] })
	}
}
