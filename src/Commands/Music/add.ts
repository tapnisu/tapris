import { Command } from '../../Interfaces'
import { validateURL } from 'ytdl-core'
const youtubeSr = require('youtube-sr').default

export const command: Command = {
	name: 'add',
	description: 'Add YouTube Music to Queue',
	aliases: ['link / name'],
	run: async (client, message, args) => {
		if (validateURL(args[0])) global.queue.push(args[0])
		if (!validateURL(args[0])) {
			let result = await youtubeSr.search(args.join('+'), { limit: 1 })

			global.queue.push(result)
		}

		return message.channel.send(`Added to queue :musical_note:`)
	}
}
