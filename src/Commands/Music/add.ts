import { Command } from '../../Interfaces'
import { validateURL } from 'ytdl-core'
const youtubeSr = require('youtube-sr').default

export const command: Command = {
	name: 'add',
	description: 'Add YouTube Music to Queue',
	aliases: ['link / name'],
	run: async (client, message, args) => {
		if (validateURL(args[0])) client.music.queue.push(args[0])
		if (!validateURL(args[0])) {
			var result = await youtubeSr.search(args.join(' '), { limit: 1 })

			if (result.length == 0)
				return message.channel.send(`Music not found! :no_entry_sign:`)

			client.music.queue.push(`https://www.youtube.com/watch?v=${result[0].id}`)
		}

		return message.channel.send(`Added to queue :musical_note:`)
	}
}
