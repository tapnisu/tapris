import { Command } from '../../Interfaces'
import { EmbedBuilder } from 'discord.js'
import axios from 'axios'
import { calcWeaknesses } from '../../Exports/pokemonTypeChart'

export const command: Command = {
	name: 'pokedex',
	description: 'Get info about pokemon / move / ability / item',
	options: [
		{
			name: 'type',
			description: 'pokemon / move / ability / item',
			choices: [
				{ name: 'pokemon', value: 'pokemon' },
				{ name: 'move', value: 'move' },
				{ name: 'ability', value: 'ability' },
				{ name: 'item', value: 'item' }
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
		const request = interaction.options.getString('name')

		if (requestType == 'pokemon') {
			let response: any = await axios.get(
				'https://play.pokemonshowdown.com/data/pokedex.js?4076b733/'
			)

			eval(response.data)

			response =
				exports.BattlePokedex[
					request.split(' ').join('').split('-').join('').toLowerCase()
				]

			if (!response)
				return interaction.followUp({
					content: `${request} is not a valid pokemon!`,
					ephemeral: true
				})

			const Embed = new EmbedBuilder()
				.setColor(client.env.BOT_COLOR)
				.setTitle(`Name: ${response.name}, ID: ${response.num}`)
				.setDescription(`Types: ${response.types.join(' / ')}`)
				.setThumbnail(
					`https://play.pokemonshowdown.com/sprites/ani/${response.name
						.replace('-Y', 'y')
						.replace('-X', 'x')
						.toLowerCase()}.gif`
				)
				.addFields([
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
						value: Object.entries(response.abilities)
							.map((ability) =>
								ability[0] != 'H' ? ability[1] : `(${ability[1]})`
							)
							.join('\n'),
						inline: true
					},
					{
						name: 'Egg groups',
						value: response.eggGroups.join('\n'),
						inline: true
					},
					{
						name: 'Weaknesses',
						value: calcWeaknesses(response.types)
							.sort((a, b) => b.scale - a.scale)
							.map((type) => `${type.name} x${type.scale}`)
							.join(', '),
						inline: true
					}
				])

			if (response.prevo != undefined) {
				Embed.addFields([
					{
						name: 'Prevo',
						value: response.prevo,
						inline: true
					}
				])
			}

			if (response.evoLevel != undefined) {
				Embed.addFields([
					{
						name: 'Evo Level',
						value: response.evoLevel.toString(),
						inline: true
					}
				])
			}

			if (response.evoType != undefined) {
				Embed.addFields([
					{
						name: 'Evo type',
						value: response.evoType,
						inline: true
					}
				])
			}

			if (response.evoCondition != undefined) {
				Embed.addFields([
					{
						name: 'Evo condition',
						value: response.evoCondition,
						inline: true
					}
				])
			}

			if (response.evoItem != undefined) {
				Embed.addFields([
					{
						name: 'Evo item',
						value: response.evoItem,
						inline: true
					}
				])
			}

			if (response.evos != undefined) {
				Embed.addFields([
					{
						name: 'Evos',
						value: response.evos.join('\n'),
						inline: true
					}
				])
			}

			if (response.otherFormes != undefined) {
				Embed.addFields([
					{
						name: 'Other forms',
						value: response.otherFormes.join('\n'),
						inline: true
					}
				])
			}

			Embed.addFields([
				{
					name: 'Can G-MAX',
					value: response.cannotDynamax == undefined ? 'True' : 'False',
					inline: true
				}
			])

			Embed.addFields([
				{
					name: 'Tier',
					value: response.tier,
					inline: true
				}
			])

			return interaction.followUp({ embeds: [Embed] })
		}
		if (requestType == 'move') {
			eval(
				(
					await axios.get(
						'https://play.pokemonshowdown.com/data/moves.js?2e0bee6d/'
					)
				).data
			)

			const response =
				exports.BattleMovedex[
					request.split(' ').join('').split('-').join('').toLowerCase()
				]

			if (!response)
				return interaction.followUp({
					content: `${request} is not a valid move!`,
					ephemeral: true
				})

			const Embed = new EmbedBuilder()
				.setColor(client.env.BOT_COLOR)
				.setTitle(
					`Name: ${request
						.split(' ')
						.join(' ')
						.split('-')
						.join(' ')
						.toLowerCase()}, ID: ${response.num}`
				)
				.setDescription(response.shortDesc)
				.addFields([
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
				])
			return interaction.followUp({ embeds: [Embed] })
		}

		if (requestType == 'ability') {
			eval(
				(
					await axios.get(
						'https://play.pokemonshowdown.com/data/abilities.js?a222a0d9/'
					)
				).data
			)

			const response =
				exports.BattleAbilities[
					request.split(' ').join('').split('-').join('').toLowerCase()
				]

			if (!response)
				return interaction.followUp({
					content: `${request} is not a valid ability!`,
					ephemeral: true
				})

			const Embed = new EmbedBuilder()
				.setColor(client.env.BOT_COLOR)
				.setTitle(`Name: ${response.name}, ID: ${response.num}`)
				.setDescription(response.shortDesc)

			return interaction.followUp({ embeds: [Embed] })
		}

		if (requestType == 'item') {
			eval(
				(
					await axios.get(
						'https://play.pokemonshowdown.com/data/items.js?3b87d391/'
					)
				).data
			)

			const response =
				exports.BattleItems[
					request.split(' ').join('').split('-').join('').toLowerCase()
				]

			if (!response)
				return interaction.followUp({
					content: `${request} is not a valid item!`,
					ephemeral: true
				})

			const Embed = new EmbedBuilder()
				.setColor(client.env.BOT_COLOR)
				.setTitle(`Name: ${response.name}, ID: ${response.num}`)
				.setDescription(response.desc)

			return interaction.followUp({ embeds: [Embed] })
		}
	}
}
