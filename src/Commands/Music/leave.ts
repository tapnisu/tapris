import { Command } from '../../Interfaces'

export const command: Command = {
	name: 'leave',
	description: 'Exit the voice channel',
	aliases: [],
	run: async (client, message, args) => {
		client.music.queue = []
		client.music.connection.destroy()

		return message.channel.send('Successfully quit the channel! :door:')
	}
}
