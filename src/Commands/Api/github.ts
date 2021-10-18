import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'
import { AxiosResponse } from '../../Interfaces/Axios'
import { GithubResponse } from '../../Interfaces/Github'
import axios from 'axios'

export const command: Command = {
	name: 'github',
	description: 'Get data from Github',
	aliases: ['name'],
	run: async (client, message, args) => {
		let response: AxiosResponse

		try {
			response = await axios.get(
				`https://api.github.com/users/${encodeURI(args.join(' '))}`
			)
		} catch {
			return message.channel.send('User not found! :no_entry_sign:')
		}

		const user: GithubResponse = response.data

		const Embed = new MessageEmbed()
			.setColor(client.config.botColor)
			.setURL(user.html_url)
			.setThumbnail(user?.avatar_url)
			.addFields(
				{ name: 'Type', value: user?.type, inline: true },
				{
					name: 'Public repositories',
					value: user.public_repos.toString(),
					inline: true
				},
				{
					name: 'Gists',
					value: user.public_gists.toString(),
					inline: true
				}
			)
			.setTimestamp()

		if (user.name == null) Embed.setTitle(user.login)
		if (user.name != null) Embed.setTitle(`${user.name} (${user.login})`)

		if (user.bio) Embed.setDescription(user.bio)
		if (user.location) Embed.addField('Location', user.location, true)
		if (user.blog) Embed.addField('Blog', user.blog, true)
		if (user.twitter_username)
			Embed.addField('Twitter', `@${user.twitter_username}`, true)

		Embed.addField('Created at', user.created_at, true)

		return message.channel.send({ embeds: [Embed] })
	}
}
