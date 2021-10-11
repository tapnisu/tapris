import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'
import translate from '@iamtraction/google-translate'

export const command: Command = {
	name: 'translate',
	description: 'Translates text',
	aliases: ['target language', 'text'],
	run: async (client, message, args) => {
		args = args.join(' ').split('\n').join('\n').split(' ')

		if (!args || args.length < 2)
			return message.channel.send(
				'You did not supply enough arguments :no_entry_sign:'
			)

		// Translate
		var request = {
			lang: args.shift().toLowerCase(),
			text: args.join(' ')
		}

		var response
		try {
			response = await translate(request.text, { to: request.lang })
		} catch {
			return message.channel.send('Error :no_entry_sign:')
		}

		// Send result
		const Embed = new MessageEmbed()
			.setColor(client.config.botColor)
			.setTitle(`Text in ${request.lang}`)
			.setDescription(response.text)
			.addField('Original language', response.from.language.iso)
			.setFooter(
				`${message.author.username}#${message.author.discriminator}`,
				message.author.avatarURL()
			)
			.setTimestamp()

		return message.channel.send({ embeds: [Embed] })
	}
}
