import { Command } from '../../Interfaces'
import { ColorResolvable, MessageEmbed } from 'discord.js'

export const command: Command = {
  name: 'invite',
  description: 'Generates an invite',
  aliases: [],
  run: async (client, message, args) => {
    let link: string = await client.generateInvite({ scopes: ['bot', 'applications.commands'] })

    const Embed = new MessageEmbed()
      .setColor(client.config.botColor as ColorResolvable)
      .setTitle('Click to invite')
      .setURL(link)
    
    message.channel.send({ embeds: [Embed] })
  }
}