import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'
import { Artifact, Character, Weapon } from '../../Interfaces/GenshinDev'
import { AxiosResponse } from '../../Interfaces/Axios'
import axios from 'axios'

export const command: Command = {
	name: 'genshin',
	description: 'Get info about character / weapon / artifacts set',
	options: [
		{
			name: 'name',
			description: 'Name of character / weapon / artifact',
			type: 3,
			required: true
		}
	],
	run: async (client, interaction) => {
		const name = encodeURI(
			interaction.options
				.getString('name')
				.split(' ')
				.join('-')
				.toLocaleLowerCase()
		)

		let response: AxiosResponse

		try {
			response = await axios.get(`https://api.genshin.dev/characters/${name}`)
		} catch {
			response = undefined
		}

		if (response?.data.name) {
			const character: Character = response.data

			let rarity = ''

			for (let i = 0; i < character.rarity; i++) {
				rarity += client.env.STAR_EMOJI
			}

			const Embed = new MessageEmbed()
				.setColor(client.env.BOT_COLOR)
				.setTitle(character.name)
				.setDescription(character.description)
				.setThumbnail(`https://api.genshin.dev/characters/${name}/icon.png`)
				.addFields(
					{
						name: 'Rarity',
						value: rarity,
						inline: true
					},
					{
						name: 'Nation',
						value: character.nation,
						inline: true
					},
					{
						name: 'Birthday',
						value: character.birthday.substr(character.birthday.length - 5),
						inline: true
					},
					{
						name: 'Constellation',
						value: character.constellation,
						inline: true
					},
					{
						name: 'Vision',
						value: character.vision,
						inline: true
					},
					{
						name: 'Weapon',
						value: character.weapon,
						inline: true
					}
				)
				.setImage(`https://api.genshin.dev/characters/${name}/gacha-splash.png`)

			return interaction.reply({ embeds: [Embed] })
		}

		try {
			response = await axios.get(`https://api.genshin.dev/weapons/${name}`)
		} catch {
			response = undefined
		}

		if (response?.data.name) {
			const weapon: Weapon = response.data

			let rarity = ''

			for (let i = 0; i < weapon.rarity; i++) {
				rarity += client.env.STAR_EMOJI
			}

			const Embed = new MessageEmbed()
				.setColor(client.env.BOT_COLOR)
				.setTitle(weapon.name)
				.setDescription(weapon.passiveDesc)
				.setThumbnail(`https://api.genshin.dev/weapons/${name}/icon.png`)
				.addFields(
					{
						name: 'Rarity',
						value: rarity,
						inline: true
					},
					{
						name: 'Name',
						value: weapon.passiveName,
						inline: true
					},
					{
						name: 'How to get',
						value: weapon.location,
						inline: true
					},
					{
						name: 'Type',
						value: weapon.type,
						inline: true
					},
					{
						name: 'Supporting stat',
						value: weapon.subStat,
						inline: true
					},
					{
						name: 'Base attack',
						value: weapon.baseAttack.toString(),
						inline: true
					}
				)
			return interaction.reply({ embeds: [Embed] })
		}

		try {
			response = await axios.get(`https://api.genshin.dev/artifacts/${name}`)
		} catch {
			response = undefined
		}

		if (response?.data.name) {
			const artifact: Artifact = response.data

			let rarity = ''

			for (let i = 0; i < artifact.max_rarity; i++) {
				rarity += client.env.STAR_EMOJI
			}

			const Embed = new MessageEmbed()
				.setColor(client.env.BOT_COLOR)
				.setTitle(artifact.name)
				.setDescription(`Max rarity: ${rarity}`)
				.setThumbnail(
					`https://api.genshin.dev/artifacts/${name}/flower-of-life.png`
				)
				.addFields(
					{
						name: '2 piece bonus',
						value: artifact['2-piece_bonus'],
						inline: true
					},
					{
						name: '4 piece bonus',
						value: artifact['4-piece_bonus'],
						inline: true
					}
				)

			return interaction.reply({ embeds: [Embed] })
		}

		return interaction.reply({
			content: 'Error, character / weapon / artifact not found',
			ephemeral: true
		})
	}
}
