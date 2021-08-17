import { Command } from '../../Interfaces'
import { convert } from 'html-to-text'

export const command: Command = {
  name: 'html',
  description: 'Convert html to text',
  aliases: ['text'],
  run: async (client, message, args) => {
    let text: string = convert(args.join(' '), { wordwrap: 130 })

    return message.channel.send(text)
  }
}