import { Command } from '../../Interfaces'
import { ColorResolvable, MessageEmbed } from 'discord.js'
import fetch from 'node-fetch'

export const command: Command = {
  name: 'azur',
  description: 'Get data about Azur Lane',
  aliases: ['name'],
  run: async (client, message, args) => {
    let request = args.join('_').toLowerCase()

    let response = await (await fetch(`https://raw.githubusercontent.com/alg-wiki/wikia/master/Ships/${request}.json`)).json()

    const Embed = new MessageEmbed()
      .setColor(client.config.botColor as ColorResolvable)
      .setTitle(response.name)
      .setURL(`https://azurlane.koumakan.jp/${request}`)
      .setDescription(response.rarity)
      .addFields(
        { name: 'ID', value: response.ID, inline: true },
        { name: 'Hull', value: response.hull, inline: true },
        { name: 'Navy', value: response.navy, inline: true },
        { name: 'Class', value: response.class, inline: true },
        { name: 'Voice acting', value: response.voiceActress, inline: true }
      )

    return message.channel.send({ embeds: [Embed] })
  }
}