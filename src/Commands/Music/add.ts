import { Command } from '../../Interfaces'
import { validateURL } from 'ytdl-core'
const youtubeSr = require("youtube-sr").default

export const command: Command = {
  name: 'add',
  description: 'Add YouTube Music to Queue',
  aliases: ['link / name'],
  run: async (client, message, args) => {
    if (validateURL(args[0])) {
      global.queue[global.queue.length] = args[0]
    } else {
      let result = await youtubeSr.search(args.join('+'), { limit: 1 })

      global.queue[global.queue.length] = result
    }

    message.channel.send(`Added to queue :musical_note:`)
  }
}