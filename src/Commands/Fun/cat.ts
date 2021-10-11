import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'
import { CatResponse } from '../../Interfaces/Nekoslife'
import axios from 'axios'

interface CatApiResponse {
	breeds: any[]
	id: string
	url: string
	width: number
	height: number
}

export const command: Command = {
	name: 'cat',
	description: 'Get cat text and photo',
	aliases: [],
	run: async (client, message, args) => {
		var response: any = {
			nekos: await axios.get('https://nekos.life/api/v2/cat'),
			image: await axios.get('https://api.thecatapi.com/v1/images/search')
		}

		var nekosResponse: CatResponse = response.nekos.data
		var catApiResponse: CatApiResponse = response.image.data

		const Embed = new MessageEmbed()
			.setColor(client.config.botColor)
			.setTitle(nekosResponse.cat)
			.setImage(catApiResponse[0].url)

		return message.channel.send({ embeds: [Embed] })
	}
}
