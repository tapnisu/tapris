import { Command } from '../../Interfaces'
import { ColorResolvable, MessageEmbed } from 'discord.js'
import translate from '@iamtraction/google-translate'
import fetch from 'node-fetch'

export const command: Command = {
  name: 'covid',
  description: 'Covid-19 tracker',
  aliases: [],
  run: async (client, message, args) => {
    // Fetch covid info
		let responseAll = await (await fetch('https://api.covid19api.com/summary')).json()

		// Make default request World
		let response = responseAll.Global
		response.Country = 'World'

		// Make request valid via translate
		let request = (await translate(args.join(' '), { to: 'en'	})).text.split(' ').join('-').toLowerCase()

		// Find request
		if (args) responseAll.Countries.forEach(country => {
			if (country.Slug == request) response = country
		})

		// Send result
		const Embed = new MessageEmbed()
			.setColor(client.config.botColor as ColorResolvable)
			.setTitle(response.Country)
			.setURL('https://xn--80aesfpebagmfblc0a.xn--p1ai/')
			.addFields({
				name: 'New confirmed',
				value: response.NewConfirmed,
				inline: true
			}, {
				name: 'New deaths',
				value: response.NewDeaths,
				inline: true
			}, {
				name: 'New recovered',
				value: response.NewRecovered,
				inline: true
			}, {
				name: 'Total confirmed',
				value: response.TotalConfirmed,
				inline: true
			}, {
				name: 'Total deaths',
				value: response.TotalDeaths,
				inline: true
			}, {
				name: 'Total recovered',
				value: response.TotalRecovered,
				inline: true
			})
			.setTimestamp()

    return message.channel.send({ embeds: [Embed] })
  }
}