import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'

export const command: Command = {
  name: 'help',
  description: 'Shows this message',
  aliases: [],
  run: async (client, message, args) => {
    const Embed = new MessageEmbed()
      .setColor(client.config.botColor)
      .setTitle('Help')
      .setDescription(`Help for the <@!${client.user.id}>!`)

    client.commands.forEach(command => {
      let aliasesList = ''
      
      command.aliases.forEach(aliase => aliasesList += `<${aliase.toString()}> `)

      Embed.addField(`${client.config.prefix}${command.name} ${aliasesList}`, command.description , true)
    })

    return message.channel.send({ embeds: [Embed] })
  }
}