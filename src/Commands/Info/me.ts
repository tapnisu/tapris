import { Command } from '../../Interfaces'
import { ColorResolvable, MessageEmbed } from 'discord.js'

export const command: Command = {
  name: 'me',
  description: 'Sends your information',
  aliases: [],
  run: async (client, message, args) => {
    let channelEmbed: any = message.guild.members.cache.get(message.author.id).voice.channel?.toString()

    if (channelEmbed == null) channelEmbed = 'Not in the channel'
    
    const Embed = new MessageEmbed()
      .setColor(client.config.botColor as ColorResolvable)
      .setTitle(`${message.author.username}#${message.author.discriminator}`)
      .setDescription(`Server member: ${message.guild.name}`)
      .setThumbnail(`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`)
      .addFields(
        { name: 'Channel', value: channelEmbed, inline: true },
        { name: 'Id', value: message.author.id, inline: true }
      )
      .setTimestamp()
    
    return message.channel.send({ embeds: [Embed] })
  }
}