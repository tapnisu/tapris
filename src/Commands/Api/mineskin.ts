import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'
import fetch from 'node-fetch'

export const command: Command = {
	name: 'mineskin',
	description: 'Get minecraft skin & UUID',
	aliases: [],
	run: async (client, message, args) => {
		let response = await (await fetch('https://nekos.life/api/v2/8ball')).json()
		let usernames = ''

		response.username_history.forEach((usernameObject) => {
			usernames += usernameObject.username + ', '
		})

		const Embed = new MessageEmbed()
			.setColor(client.config.botColor)
			.setTitle(response.username)
			.setDescription(`UUID: ${response.uuid}`)
			.setImage(`${response.textures.skin.url}`)
			.addFields({ name: 'All names', value: usernames })
			.setTimestamp()

		return message.channel.send({ embeds: [Embed] })
	}
}
