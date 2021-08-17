import { Command } from '../../Interfaces'

export const command: Command = {
  name: 'skip',
  description: 'Skip current music',
  aliases: [],
  run: async (client, message, args) => {
    global.queue.shift()
    message.channel.send('Missed :musical_note:')
  }
}