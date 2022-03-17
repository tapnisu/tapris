import { Command } from '../../Interfaces'
import { MessageEmbed } from 'eris'
import { AxiosResponse } from '../../Interfaces/Axios'
import { CatResponse } from '../../Interfaces/Nekoslife'
import axios from 'axios'

interface CatApiResponse {
	breeds: unknown[]
	id: string
	url: string
	width: number
	height: number
}

export const command: Command = {
	name: 'cat',
	description: 'Get cat text and photo',
	run: async (client, interaction) => {
		const nekosResponse: CatResponse = (
			(await axios.get('https://nekos.life/api/v2/cat')) as AxiosResponse
		).data
		const catApiResponse: CatApiResponse = (
			(await axios.get(
				'https://api.thecatapi.com/v1/images/search'
			)) as AxiosResponse
		).data

		const Embed = new MessageEmbed()
			.setColor(client.env.BOT_COLOR)
			.setTitle(nekosResponse.cat)
			.setImage(catApiResponse[0].url)

		return interaction.createMessage({ embeds: [Embed] })
	}
}
