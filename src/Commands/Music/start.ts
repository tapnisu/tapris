import { Command } from '../../Interfaces'
import { play } from '../../Exports/music'

export const command: Command = {
	name: 'start',
	description: 'Play music from the queue',
	run: async (client, interaction) => {
		interaction.followUp('Starting...')

		return play(client, interaction)
	}
}
