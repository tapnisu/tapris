import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'
import axios from 'axios'

export const command: Command = {
	name: 'gcodes',
	description: 'Codes for genshin impact',
	aliases: ['new / shoot'],
	run: async (client, message, args) => {
		let response = (
			await axios.get(
				'https://raw.githubusercontent.com/ataraxyaffliction/gipn-json/main/gipn.json'
			)
		).data

		const Embed = new MessageEmbed()
			.setColor(client.config.botColor)
			.setTitle('Genshin codes')
			.setDescription('You can activate them in game, and get rewards!')
			.setURL('https://genshin.mihoyo.com/en/gift')

		response.CODES.forEach((code) => {
			if (code.is_expired == false) {
				let rewards = []

				code.reward_array.forEach((reward) => {
					rewards.push(`${reward.name}: ${reward.count}`)
				})

				Embed.addField(code.code, rewards.join('\n'), true)
			}
		})

		message.channel.send({ embeds: [Embed] })
	}
}
