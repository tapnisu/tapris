import { play } from '../../Functions/music'
import { Command } from '../../Interfaces'

export const command: Command = {
	name: 'skip',
	description: 'Skip current music',
	aliases: [],
	run: async (client, message, args) => {
		client.music.queue.shift()
		client.music.connection.destroy()

		message.channel.send('Missed :musical_note:')

		return play(client, message)
	}
}
