import { Command } from '../../Interfaces'
import { ColorResolvable, MessageEmbed } from 'discord.js'
import translate from '@iamtraction/google-translate'

export const command: Command = {
  name: 'translate',
  description: 'Translates text',
  aliases: ['target language', 'text'],
  run: async (client, message, args) => {
    if (!args || args.length < 2) return message.channel.send('You did not supply enough arguments :no_entry_sign:')

    let requestLanguage = args.shift().toLowerCase()

    try {
      // Translate
      let response = await translate(args.join(' '), { to: requestLanguage })

      // Send result
      const Embed = new MessageEmbed()
        .setColor(client.config.botColor as ColorResolvable)
        .setTitle(`Text in ${requestLanguage}`)
        .setDescription(response.text)
        .addField('Original language', response.from.language.iso)
        .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())  
        .setTimestamp()
      
      return message.channel.send({ embeds: [Embed] })
    } catch {
      return message.channel.send('Error :no_entry_sign:')
    }
  }
}