import { Command } from '../../Interfaces'
import { ColorResolvable, MessageEmbed } from 'discord.js'
import fetch from 'node-fetch'

export const command: Command = {
  name: 'tcgdex',
  description: 'Get pokemon card data TCG',
  aliases: ['name'],
  run: async (client, message, args) => {
    let response = await (await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${args.join('&%20').toLowerCase()}`)).json()

    const Embed = new MessageEmbed()
      .setColor(client.config.botColor as ColorResolvable)
      .setTitle(`${response.data[0].supertype}: ${response.data[0].name}`)
      .setDescription(`${response.data[0].set.series}: ${response.data[0].set.name}`)
      .setThumbnail(response.data[0].set.images.symbol)
      .addFields({
        name: 'Release date',
        value: response.data[0].set.releaseDate,
        inline: true
      }, {
        name: 'Rarity',
        value: response.data[0].rarity,
        inline: true
      })
      .setImage(response.data[0].images.large)

    return message.channel.send({ embeds: [Embed] })
  }
}