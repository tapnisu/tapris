import { Command } from '../../Interfaces'
import { play } from '../../Functions/music'

export const command: Command = {
	name: 'start',
	description: 'Play music from the queue',
	aliases: [],
	run: async (client, message, args) => {
		return play(client, message)
	}
}
