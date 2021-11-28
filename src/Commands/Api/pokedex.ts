import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'
import axios from 'axios'

export const command: Command = {
	name: 'pokedex',
	description: 'Get info about pokemon / atack / ability / item',
	options: [
		{
			name: 'name',
			description: 'Name of pokemon / atack / ability / item',
			type: 3,
			required: true
		}
	],
	run: async (client, interaction) => {
		const request = interaction.options.getString('name')

		try {
			let response: any = await axios.get(
				'https://play.pokemonshowdown.com/data/pokedex.js?4076b733/'
			)

			let script = eval(response.data)

			if (parseInt(request).toString() == request) {
				Object.keys(exports.BattlePokedex).forEach((pokemonName) => {
					if (exports.BattlePokedex[pokemonName].num.toString() == request)
						return (response = exports.BattlePokedex[pokemonName])
				})
			} else {
				response =
					exports.BattlePokedex[
						request.split(' ').join('').split('-').join('').toLowerCase()
					]
			}

			if (response) {
				const Embed = new MessageEmbed()
					.setColor(client.config.botColor)
					.setTitle(`Name: ${response.name}, ID: ${response.num}`)
					.setDescription(`Types: ${response.types.join(' / ')}`)
					.setThumbnail(
						`https://play.pokemonshowdown.com/sprites/ani/${response.name
							.replace('-Y', 'y')
							.replace('-X', 'x')
							.toLowerCase()}.gif`
					)
					.addFields(
						{
							name: 'Height (m)',
							value: response.heightm.toString(),
							inline: true
						},
						{
							name: 'Weight (kg)',
							value: response.weightkg.toString(),
							inline: true
						},
						{
							name: 'Total',
							value: (
								response.baseStats.hp +
								response.baseStats.atk +
								response.baseStats.def +
								response.baseStats.spa +
								response.baseStats.spd +
								response.baseStats.spe
							).toString(),
							inline: true
						},
						{
							name: 'HP',
							value: response.baseStats.hp.toString(),
							inline: true
						},
						{
							name: 'ATK',
							value: response.baseStats.atk.toString(),
							inline: true
						},
						{
							name: 'DEF',
							value: response.baseStats.def.toString(),
							inline: true
						},
						{
							name: 'SPATK',
							value: response.baseStats.spa.toString(),
							inline: true
						},
						{
							name: 'SPDEF',
							value: response.baseStats.spd.toString(),
							inline: true
						},
						{
							name: 'SPEED',
							value: response.baseStats.spe.toString(),
							inline: true
						},
						{
							name: 'Abilities',
							value: Object.entries(response.abilities).join('\n'),
							inline: true
						},
						{
							name: 'Egg groups',
							value: response.eggGroups.join('\n'),
							inline: true
						}
					)

				if (response.prevo != undefined) {
					Embed.addFields({
						name: 'Prevo',
						value: response.prevo,
						inline: true
					})
				}
				if (response.evoLevel != undefined) {
					Embed.addFields({
						name: 'Evo Level',
						value: response.evoLevel.toString(),
						inline: true
					})
				}
				if (response.evoType != undefined) {
					Embed.addFields({
						name: 'Evo type',
						value: response.evoType,
						inline: true
					})
				}
				if (response.evoCondition != undefined) {
					Embed.addFields({
						name: 'Evo condition',
						value: response.evoCondition,
						inline: true
					})
				}
				if (response.evoItem != undefined) {
					Embed.addFields({
						name: 'Evo item',
						value: response.evoItem,
						inline: true
					})
				}
				if (response.evos != undefined) {
					Embed.addFields({
						name: 'Evos',
						value: response.evos.join('\n'),
						inline: true
					})
				}
				if (response.otherFormes != undefined) {
					Embed.addFields({
						name: 'Other formes',
						value: response.otherFormes.join('\n'),
						inline: true
					})
				}

				let gmax

				if (response.cannotDynamax == undefined) {
					gmax = 'True'
				} else {
					gmax = 'False'
				}

				Embed.addFields(
					{
						name: 'Can G-MAX',
						value: gmax,
						inline: true
					},
					{
						name: 'Tier',
						value: response.tier,
						inline: true
					}
				)

				return interaction.reply({ embeds: [Embed] })
			}

			script = (
				await axios.get(
					'https://play.pokemonshowdown.com/data/moves.js?2e0bee6d/'
				)
			).data

			eval(script)

			response =
				exports.BattleMovedex[
					request.split(' ').join('').split('-').join('').toLowerCase()
				]

			if (response) {
				const Embed = new MessageEmbed()
					.setColor(client.config.botColor)
					.setTitle(
						`Name: ${request
							.split(' ')
							.join(' ')
							.split('-')
							.join(' ')
							.toLowerCase()}, ID: ${response.num}`
					)
					.setDescription(response.shortDesc)
					.addFields(
						{
							name: 'Type',
							value: response.type,
							inline: true
						},
						{
							name: 'Category',
							value: response.category,
							inline: true
						},
						{
							name: 'Base power',
							value: response.basePower.toString(),
							inline: true
						},
						{
							name: 'Accuracy',
							value: response.accuracy.toString(),
							inline: true
						},
						{
							name: 'PP',
							value: response.pp.toString(),
							inline: true
						},
						{
							name: 'Priority',
							value: response.priority.toString(),
							inline: true
						}
					)
				return interaction.reply({ embeds: [Embed] })
			}
			script = (
				await axios.get(
					'https://play.pokemonshowdown.com/data/abilities.js?a222a0d9/'
				)
			).data

			eval(script)

			response =
				exports.BattleAbilities[
					request.split(' ').join('').split('-').join('').toLowerCase()
				]

			if (response) {
				const Embed = new MessageEmbed()
					.setColor(client.config.botColor)
					.setTitle(`Name: ${response.name}, ID: ${response.num}`)
					.setDescription(response.shortDesc)
				return interaction.reply({ embeds: [Embed] })
			}

			script = (
				await axios.get(
					'https://play.pokemonshowdown.com/data/items.js?3b87d391/'
				)
			).data

			eval(script)
			response =
				exports.BattleItems[
					request.split(' ').join('').split('-').join('').toLowerCase()
				]

			if (response) {
				const Embed = new MessageEmbed()
					.setColor(client.config.botColor)
					.setTitle(`Name: ${response.name}, ID: ${response.num}`)
					.setDescription(response.shortDesc)
					.addFields({
						name: 'Fling base power',
						value: response.fling.basePower.toString(),
						inline: true
					})
				return interaction.reply({ embeds: [Embed] })
			}

			return interaction.reply({
				content: `${request} is not a valid pokemon / atack / ability / item`,
				ephemeral: true
			})
		} catch {
			return interaction.reply({
				content: `${request} is not a valid pokemon / atack / ability / item`,
				ephemeral: true
			})
		}
	}
}
