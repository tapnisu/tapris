import { Command } from '../../Interfaces'
import { ColorResolvable, MessageEmbed } from 'discord.js'
import fetch from 'node-fetch'

export const command: Command = {
  name: '8ball',
  description: 'Test your luck',
  aliases: [],
  run: async (client, message, args) => {
    let response = await (await fetch('https://nekos.life/api/v2/8ball')).json()

    const Embed = new MessageEmbed()
      .setColor(client.config.botColor as ColorResolvable)
      .setTitle(response.response)
      .setImage(response.url)

    return message.channel.send({ embeds: [Embed] })
  }
}