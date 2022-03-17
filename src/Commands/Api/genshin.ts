import { Command } from '../../Interfaces'
import { MessageEmbed } from 'eris'
import { Artifact, Character, Weapon } from '../../Interfaces/GenshinDev'
import { AxiosResponse } from '../../Interfaces/Axios'
import axios from 'axios'

export const command: Command = {
	name: 'genshin',
	description: 'Get info about character / weapon / artifacts set',
	options: [
		{
			name: 'type',
			description: 'character / weapon / artifact',
			choices: [
				{ name: 'character', value: 'character' },
				{ name: 'weapon', value: 'weapon' },
				{ name: 'artifact', value: 'artifact' }
			],
			type: 3,
			required: true
		},
		{
			name: 'name',
			description: 'Name of target',
			type: 3,
			required: true
		}
	],
	run: async (client, interaction) => {
		const requestType = interaction.options.getString('type')
		const request = encodeURI(
			interaction.options
				.getString('name')
				.split(' ')
				.join('-')
				.toLocaleLowerCase()
		)

		if (requestType == 'character') {
			const response: AxiosResponse = await axios
				.get(`https://api.genshin.dev/characters/${request}`)
				.catch(() => undefined)

			if (!response)
				return interaction.reply({
					content: `${request} is not a valid character!`,
					ephemeral: true
				})

			const character: Character = response.data

			let rarity = ''

			for (let i = 0; i < character.rarity; i++) {
				rarity += ':star:'
			}

			const Embed = new MessageEmbed()
				.setColor(client.env.BOT_COLOR)
				.setTitle(character.name)
				.setDescription(character.description)
				.setThumbnail(`https://api.genshin.dev/characters/${request}/icon.png`)
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
				.setImage(
					`https://api.genshin.dev/characters/${request}/gacha-splash.png`
				)

			return interaction.reply({ embeds: [Embed] })
		}

		if (requestType == 'weapon') {
			const response: AxiosResponse = await axios
				.get(`https://api.genshin.dev/weapons/${request}`)
				.catch(() => undefined)

			if (!response)
				return interaction.reply({
					content: `${request} is not a valid weapon`,
					ephemeral: true
				})

			const weapon: Weapon = response.data

			let rarity = ''

			for (let i = 0; i < weapon.rarity; i++) {
				rarity += ':star:'
			}

			const Embed = new MessageEmbed()
				.setColor(client.env.BOT_COLOR)
				.setTitle(weapon.name)
				.setDescription(weapon.passiveDesc)
				.setThumbnail(`https://api.genshin.dev/weapons/${request}/icon.png`)
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

		if (requestType == 'artifact') {
			const response: AxiosResponse = await axios
				.get(`https://api.genshin.dev/artifacts/${request}`)
				.catch(() => undefined)

			if (!response)
				return interaction.reply({
					content: `${request} is not a valid weapon`,
					ephemeral: true
				})

			const artifact: Artifact = response.data

			let rarity = ''

			for (let i = 0; i < artifact.max_rarity; i++) {
				rarity += ':star:'
			}

			const Embed = new MessageEmbed()
				.setColor(client.env.BOT_COLOR)
				.setTitle(artifact.name)
				.setDescription(`Max rarity: ${rarity}`)
				.setThumbnail(
					`https://api.genshin.dev/artifacts/${request}/flower-of-life.png`
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
	}
}
