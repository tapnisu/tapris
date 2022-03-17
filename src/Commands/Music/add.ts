// eslint-disable-next-line @typescript-eslint/no-var-requires
const youtubeSr = require('youtube-sr').default
import { Command } from '../../Interfaces'
import { validateURL } from 'ytdl-core'

export const command: Command = {
	name: 'add',
	description: 'Add YouTube Music to Queue',
	options: [
		{
			name: 'music',
			description: 'Name or link',
			type: 3,
			required: true
		}
	],
	run: async (client, interaction) => {
		const musicItem = interaction.options.getString('music')

		if (!client.music.queue?.[interaction.guildId])
			client.music.queue[interaction.guildId] = []

		if (validateURL(musicItem))
			client.music.queue[interaction.guildId] = [
				...client.music.queue[interaction.guildId],
				musicItem
			]
		if (!validateURL(musicItem)) {
			const result = await youtubeSr.search(musicItem, { limit: 1 })

			if (result.length == 0)
				return interaction.createMessage('Music not found! :no_entry_sign:')

			client.music.queue[interaction.guildId] = [
				...client.music.queue[interaction.guildId],
				`https://www.youtube.com/watch?v=${result[0].id}`
			]
		}

		return interaction.createMessage('Added to queue :musical_note:')
	}
}
