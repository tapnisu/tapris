import { play } from '../../Functions/music'
import { Command } from '../../Interfaces'

export const command: Command = {
	name: 'skip',
	description: 'Skip current music',
	run: async (client, interaction) => {
		client.music.queue[interaction.guildId]?.shift()
		client.music.connection?.destroy()

		interaction.reply('Skipped :musical_note:')

		return play(client, interaction)
	}
}
