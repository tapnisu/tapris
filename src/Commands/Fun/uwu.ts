import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'
import { AxiosResponse } from '../../Interfaces/Axios'
import { UwuResponse } from '../../Interfaces/Nekoslife'
import axios from 'axios'

export const command: Command = {
	name: 'uwu',
	description: 'Get UwU text',
	aliases: ['text'],
	run: async (client, message, args) => {
		if (args.length == 0)
			return message.channel.send(
				'You did not supply enough arguments :no_entry_sign:'
			)

		const response: AxiosResponse = await axios.get(
			`https://nekos.life/api/v2/owoify?text=${encodeURI(args.join(' '))}`
		)

		const uwuResponse: UwuResponse = response.data

		const Embed = new MessageEmbed()
			.setColor(client.config.botColor)
			.setTitle(uwuResponse.owo)

		return message.channel.send({ embeds: [Embed] })
	}
}
