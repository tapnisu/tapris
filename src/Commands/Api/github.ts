import { Command } from '../../Interfaces'
import { MessageEmbed } from 'eris'
import { AxiosResponse } from '../../Interfaces/Axios'
import { GithubResponse } from '../../Interfaces/Github'
import axios from 'axios'

export const command: Command = {
	name: 'github',
	description: 'Get data from Github',
	options: [
		{
			name: 'user',
			description: 'User to be shown',
			type: 3,
			required: true
		}
	],
	run: async (client, interaction) => {
		const user = interaction.options.getString('user')

		try {
			const response: AxiosResponse = await axios.get(
				`https://api.github.com/users/${encodeURI(user)}`
			)

			const userData: GithubResponse = response.data

			const Embed = new MessageEmbed()
				.setColor(client.env.BOT_COLOR)
				.setURL(userData.html_url)
				.setThumbnail(userData?.avatar_url)
				.addFields(
					{ name: 'Type', value: userData?.type, inline: true },
					{
						name: 'Public repositories',
						value: userData.public_repos.toString(),
						inline: true
					},
					{
						name: 'Gists',
						value: userData.public_gists.toString(),
						inline: true
					}
				)
				.setTimestamp(new Date(userData.created_at))

			if (userData.name == null) Embed.setTitle(userData.login)
			if (userData.name != null)
				Embed.setTitle(`${userData.name} (${userData.login})`)

			if (userData.bio) Embed.setDescription(userData.bio)
			if (userData.location) Embed.addField('Location', userData.location, true)
			if (userData.blog) Embed.addField('Blog', userData.blog, true)
			if (userData.twitter_username)
				Embed.addField('Twitter', `@${userData.twitter_username}`, true)

			return interaction.createMessage({ embeds: [Embed] })
		} catch {
			return interaction.createMessage({
				content: 'User not found :no_entry_sign:',
				ephemeral: true
			})
		}
	}
}
