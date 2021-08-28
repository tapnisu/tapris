import { Command } from '../../Interfaces'

export const command: Command = {
	name: 'leave',
	description: 'Exit the voice channel',
	aliases: [],
	run: async (client, message, args) => {
		global.queue = []
		global.connection.destroy()

		message.channel.send('Successfully quit the channel! :door:')
	}
}
