import { Event, Command } from '../Interfaces'
import { Message } from 'discord.js'

export const event: Event = {
  name: 'messageCreate',
  run: (client, message: Message) => {
    console.log(`${message?.guild.name}, ${message.author.username}: ${message.content}`)

    if (message.author.bot) return
    if (!message.guild) return
    if (!message.content.startsWith(client.config.prefix)) return

    const args = message.content
      .slice(client.config.prefix.length)
      .trim()
      .split(/ +/g)
    
    const cmd = args.shift().toLowerCase()
    if (!cmd) return
    const command = client.commands.get(cmd) || client.aliases.get(cmd)
    try {
      if (command) (command as Command).run(client, message, args)
    } catch {
      return message.channel.send('Error :no_entry_sign:')
    }  
  }
}