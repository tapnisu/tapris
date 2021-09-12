import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'
import translate from '@iamtraction/google-translate'
import axios from 'axios'

export const command: Command = {
	name: 'covid',
	description: 'Covid-19 tracker',
	aliases: ['country name'],
	run: async (client, message, args) => {
		// Fetch covid info
		let responseAll = (await axios.get('https://api.covid19api.com/summary'))
			.data

		// Make default request World
		let response = responseAll.Global
		response.Country = 'World'

		// Make request valid via translate
		let request = (await translate(args.join(' '), { to: 'en' })).text
			.split(' ')
			.join('-')
			.toLowerCase()

		// Find request
		if (args)
			responseAll.Countries.forEach((country) => {
				if (country.Slug == request) response = country
			})

		// Send result
		const Embed = new MessageEmbed()
			.setColor(client.config.botColor)
			.setTitle(response.Country)
			.setURL('https://xn--80aesfpebagmfblc0a.xn--p1ai/')
			.addFields(
				{
					name: 'New confirmed',
					value: response.NewConfirmed.toString(),
					inline: true
				},
				{
					name: 'New deaths',
					value: response.NewDeaths.toString(),
					inline: true
				},
				{
					name: 'New recovered',
					value: response.NewRecovered.toString(),
					inline: true
				},
				{
					name: 'Total confirmed',
					value: response.TotalConfirmed.toString(),
					inline: true
				},
				{
					name: 'Total deaths',
					value: response.TotalDeaths.toString(),
					inline: true
				},
				{
					name: 'Total recovered',
					value: response.TotalRecovered.toString(),
					inline: true
				}
			)
			.setTimestamp(response.Date)

		return message.channel.send({ embeds: [Embed] })
	}
}
