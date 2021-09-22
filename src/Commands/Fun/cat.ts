import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'
import axios from 'axios'

export const command: Command = {
	name: 'cat',
	description: 'Get cat text and photo',
	aliases: [],
	run: async (client, message, args) => {
		let response = {
			nekos: (await axios.get('https://nekos.life/api/v2/cat')).data,
			image: (await axios.get('https://api.thecatapi.com/v1/images/search'))
				.data
		}

		const Embed = new MessageEmbed()
			.setColor(client.config.botColor)
			.setTitle(response.nekos.cat)
			.setImage(response.image[0].url)

		return message.channel.send({ embeds: [Embed] })
	}
}
