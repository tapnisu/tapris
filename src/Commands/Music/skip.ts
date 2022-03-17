import { play } from '../../Exports/music'
import { Command } from '../../Interfaces'

export const command: Command = {
	name: 'skip',
	description: 'Skip current music',
	run: async (client, interaction) => {
		client.music.queue[interaction.guildId]?.shift()
		client.music.connection?.destroy()

		interaction.createMessage('Skipped :musical_note:')

		return play(client, interaction)
	}
}
