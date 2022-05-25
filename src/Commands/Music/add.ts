// eslint-disable-next-line @typescript-eslint/no-var-requires
const youtubeSr = require('youtube-sr').default
import { Command } from '../../Interfaces'
import { validateURL } from 'ytdl-core'

export const command: Command = {
	name: 'add',
	description: 'Add YouTube Music to Queue',
	options: [
		{
			name: 'type',
			description: 'Type of data you want to get',
			choices: [
				{ name: 'video url', value: 'video-url' },
				{ name: 'video title', value: 'video-title' },
				{ name: 'playlist url', value: 'playlist-url' }
			],
			type: 3,
			required: true
		},
		{
			name: 'request',
			description: 'Video url / title / playlist url',
			type: 3,
			required: true
		}
	],
	run: async (client, interaction) => {
		const type = interaction.options.getString('type')
		const request = interaction.options.getString('request')

		if (!client.music.queue?.[interaction.guildId])
			client.music.queue[interaction.guildId] = []

		if (type == 'video-url') {
			if (validateURL(request))
				client.music.queue[interaction.guildId] = [
					...client.music.queue[interaction.guildId],
					request
				]
				
			else return interaction.reply('Url is invalid! :no_entry_sign:')
		}

		if (type == 'video-title') {
			const result = await youtubeSr.search(request, { limit: 1 })

			if (result.length == 0)
				return interaction.reply('Music not found! :no_entry_sign:')

			client.music.queue[interaction.guildId] = [
				...client.music.queue[interaction.guildId],
				result[0].id
			]
		}

		if (type == 'playlist-url') {
			try {
				client.music.queue[interaction.guildId] = [
					...client.music.queue[interaction.guildId],
					...(await (await youtubeSr.getPlaylist(request)).fetch()).videos.map(video => video.id)
				]
			}	catch {
				return interaction.reply('Playlist not found! :no_entry_sign:')
			}
		}

		return interaction.reply('Added to queue :musical_note:')
	}
}
