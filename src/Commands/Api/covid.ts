import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'
import translate from '@iamtraction/google-translate'
import { Country, CovidResponse } from '../../Interfaces/Covid'
import axios from 'axios'

export const command: Command = {
	name: 'covid',
	description: 'Covid-19 tracker',
	aliases: ['country name'],
	run: async (client, message, args) => {
		// Fetch covid info
		var responseAll: CovidResponse = (
			await axios.get('https://api.covid19api.com/summary')
		).data

		// Make request valid via translate
		var request = (await translate(args.join(' '), { to: 'en' })).text
			.split(' ')
			.join('-')
			.toLowerCase()

		// Send result
		var data: any = responseAll.Global

		responseAll.Countries.forEach((country: Country) => {
			if (country.Slug == request) {
				data = country
			}
		})

		const Embed = new MessageEmbed()
			.setColor(client.config.botColor)
			.setTitle(data.Country ? data.Country : 'World')
			.addFields(
				{
					name: 'New confirmed',
					value: data.NewConfirmed.toString(),
					inline: true
				},
				{
					name: 'New deaths',
					value: data.NewDeaths.toString(),
					inline: true
				},
				{
					name: 'New recovered',
					value: data.NewRecovered.toString(),
					inline: true
				},
				{
					name: 'Total confirmed',
					value: data.TotalConfirmed.toString(),
					inline: true
				},
				{
					name: 'Total deaths',
					value: data.TotalDeaths.toString(),
					inline: true
				},
				{
					name: 'Total recovered',
					value: data.TotalRecovered.toString(),
					inline: true
				}
			)
			.setTimestamp(new Date(data.Date))

		return message.channel.send({ embeds: [Embed] })
	}
}
