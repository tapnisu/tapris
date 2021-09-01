import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'
import fetch from 'node-fetch'

export const command: Command = {
	name: 'github',
	description: 'Get data from Github',
	aliases: ['name'],
	run: async (client, message, args) => {
		try {
			let response = await (
				await fetch(`https://api.github.com/users/${args.join('%20')}`)
			).json()

			if (response.message == 'Not Found')
				return message.channel.send('Error :no_entry_sign:')

			const Embed = new MessageEmbed()
				.setColor(client.config.botColor)
				.setURL(response.html_url)
				.setThumbnail(response?.avatar_url)
				.addFields(
					{ name: 'Type', value: response?.type, inline: true },
					{
						name: 'Public repositories',
						value: response.public_repos.toString(),
						inline: true
					},
					{
						name: 'Gists',
						value: response.public_gists.toString(),
						inline: true
					}
				)
				.setTimestamp()

			if (response.name == null) Embed.setTitle(response.login)
			if (response.name != null)
				Embed.setTitle(`${response.name} (${response.login})`)

			if (response.bio) Embed.setDescription(response.bio)
			if (response.location) Embed.addField('Location', response.location, true)
			if (response.blog) Embed.addField('Blog', response.blog, true)
			if (response.twitter_username)
				Embed.addField('Twitter', `@${response.twitter_username}`, true)

			Embed.addField('Created at', response.created_at, true)

			return message.channel.send({ embeds: [Embed] })
		} catch (err) {
			return message.channel.send('Error :no_entry_sign:' + err)
		}
	}
}
