import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'

export const command: Command = {
  name: 'server',
  description: 'Get info about server',
  aliases: [],
  run: async (client, message, args) => {
    let Embed = new MessageEmbed()
      .setColor(client.config.botColor)
      .setTitle(message.guild.name)
      .setThumbnail(`https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png`)
      .setDescription('Info about server')
      .addFields(
        { name: 'Owner', value: `<@!${message.guild.ownerId}>`, inline: true},
        { name: 'Number of participants', value: message.guild.memberCount.toString(), inline: true },
        { name: 'Number of emoticons', value: message.guild.emojis.cache.size.toString(), inline: true },
        { name: 'Number of roles', value: message.guild.roles.cache.size.toString(), inline: true },
        { name: 'ID', value: message.guild.id, inline: true }
      )
    return message.channel.send({ embeds: [Embed] })
  }
}