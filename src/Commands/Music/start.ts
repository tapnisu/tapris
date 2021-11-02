import { Command } from '../../Interfaces'
import { play } from '../../Functions/music'

export const command: Command = {
	name: 'start',
	description: 'Play music from the queue',
	run: async (client, interaction) => {
		return play(client, interaction)
	}
}
