import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'
import { AxiosResponse } from '../../Interfaces/Axios'
import { Code } from '../../Interfaces/GIPN'
import axios from 'axios'

export const command: Command = {
	name: 'gcodes',
	description: 'Codes for genshin impact',
	run: async (client, interaction) => {
		const response: AxiosResponse = await axios.get(
			'https://raw.githubusercontent.com/ataraxyaffliction/gipn-json/main/gipn.json'
		)

		const codes: Code[] = response.data.CODES

		const Embed = new MessageEmbed()
			.setColor(client.config.botColor)
			.setTitle('Genshin codes')
			.setDescription('You can activate them in game, and get rewards!')
			.setURL('https://genshin.mihoyo.com/en/gift')

		codes.forEach((code) => {
			if (code.is_expired == false) {
				let rewards: string[] = []

				code.reward_array.forEach((reward) => {
					rewards = [...rewards, `${reward.name}: ${reward.count}`]
				})

				Embed.addField(code.code, rewards.join('\n'), true)
			}
		})

		interaction.reply({ embeds: [Embed] })
	}
}
