import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'
import axios from 'axios'

export const command: Command = {
	name: 'genshin',
	description: 'Get info about character / weapon / set of artifacts',
	aliases: ['name'],
	run: async (client, message, args) => {
		try {
			let name = args.join('-').toLowerCase()

			let response
			try {
				response = (
					await axios.get(
						`https://api.genshin.dev/characters/${name.toLowerCase()}`
					)
				).data
			} catch {
				return message.channel.send('Error :no_entry_sign:')
			}

			if (response.name) {
				let rarity = ''

				for (let i = 0; i < response.rarity; i++) {
					rarity += client.config.starEmoji
				}

				const Embed = new MessageEmbed()
					.setColor(client.config.botColor)
					.setTitle(response.name)
					.setDescription(response.description)
					.setThumbnail(`https://api.genshin.dev/characters/${name}/icon.png`)
					.addFields(
						{
							name: 'Rarity',
							value: rarity,
							inline: true
						},
						{
							name: 'Nation',
							value: response.nation,
							inline: true
						},
						{
							name: 'Birthday',
							value: response.birthday.substr(response.birthday.length - 5),
							inline: true
						},
						{
							name: 'Constellation',
							value: response.constellation,
							inline: true
						},
						{
							name: 'Vision',
							value: response.vision,
							inline: true
						},
						{
							name: 'Weapon',
							value: response.weapon,
							inline: true
						}
					)

				return message.channel.send({ embeds: [Embed] })
			}

			response = (await axios.get(`https://api.genshin.dev/weapons/${name}`))
				.data

			if (response.name) {
				let rarity = ''

				for (let i = 0; i < response.rarity; i++) {
					rarity += client.config.starEmoji
				}

				const Embed = new MessageEmbed()
					.setColor(client.config.botColor)
					.setTitle(response.name)
					.setDescription(response.passiveDesc)
					.setThumbnail(`https://api.genshin.dev/weapons/${name}/icon.png`)
					.addFields(
						{
							name: 'Rarity',
							value: rarity,
							inline: true
						},
						{
							name: 'Name',
							value: response.passiveName,
							inline: true
						},
						{
							name: 'How to get',
							value: response.location,
							inline: true
						},
						{
							name: 'Type',
							value: response.type,
							inline: true
						},
						{
							name: 'Supporting stat',
							value: response.subStat,
							inline: true
						},
						{
							name: 'Base attack',
							value: response.baseAttack.toString(),
							inline: true
						}
					)
				return message.channel.send({ embeds: [Embed] })
			}

			response = (await axios.get(`https://api.genshin.dev/artifacts/${name}`))
				.data

			if (response.name) {
				let rarity = ''

				for (let i = 0; i < response.max_rarity; i++) {
					rarity += client.config.starEmoji
				}

				const Embed = new MessageEmbed()
					.setColor(client.config.botColor)
					.setTitle(response.name)
					.setDescription(`Max rarity: ${rarity}`)
					.setThumbnail(
						`https://api.genshin.dev/artifacts/${name}/flower-of-life.png`
					)
					.addFields(
						{
							name: '2 piece bonus',
							value: response['2-piece_bonus'],
							inline: true
						},
						{
							name: '4 piece bonus',
							value: response['4-piece_bonus'],
							inline: true
						}
					)

				return message.channel.send({ embeds: [Embed] })
			}

			return message.channel.send('Error :no_entry_sign:')
		} catch {
			return message.channel.send('Error :no_entry_sign:')
		}
	}
}
