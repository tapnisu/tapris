import { Command } from '../../Interfaces'
import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js'

export const command: Command = {
	name: 'lmgtfy',
	description: 'Let Me Google That For You',
	options: [
		{
			name: 'question',
			description: 'Question to be searched',
			type: 3,
			required: true
		}
	],
	run: async (client, interaction) => {
		const question = interaction.options.getString('question')
		const link = `https://lmgtfy.app/?q=${encodeURI(question.replace(/ /, '+'))}`

		const buttonsRow = new MessageActionRow().addComponents(
			new MessageButton().setURL(link).setLabel('Invite bot').setStyle('LINK')
		)

		const Embed = new MessageEmbed()
			.setColor(client.env.BOT_COLOR)
			.setTitle(question)
			.setURL(link)

		return interaction.reply({ embeds: [Embed], components: [buttonsRow] })
	}
}
