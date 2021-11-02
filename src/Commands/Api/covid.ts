import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'
import translate from '@iamtraction/google-translate'
import { AxiosResponse } from '../../Interfaces/Axios'
import { Country, CovidResponse } from '../../Interfaces/Covid'
import axios from 'axios'

export const command: Command = {
	name: 'covid',
	description: 'Covid-19 tracker',
	options: [
		{
			name: 'country',
			description: 'Name of country',
			type: 3,
			required: false
		}
	],
	run: async (client, interaction) => {
		const response: AxiosResponse = await axios.get(
			'https://api.covid19api.com/summary'
		)

		const responseAll: CovidResponse = response.data

		// Make request valid via translate
		const request = (
			await translate(interaction.options.getString('country'), { to: 'en' })
		).text
			.split(' ')
			.join('-')
			.toLowerCase()

		// Send result
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let data: any = responseAll.Global

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

		return interaction.reply({ embeds: [Embed] })
	}
}
