import { Command } from '../../Interfaces'
import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder
} from 'discord.js'

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
		const link = `https://lmgtfy.app/?q=${encodeURI(
			question.replace(/ /, '+')
		)}`

		const buttonsRow = new ActionRowBuilder().addComponents([
			new ButtonBuilder()
				.setURL(link)
				.setLabel('Invite bot')
				.setStyle(ButtonStyle.Link)
		])

		const Embed = new EmbedBuilder()
			.setColor(client.env.BOT_COLOR)
			.setTitle(question)
			.setURL(link)

		return interaction.reply({ embeds: [Embed], components: [buttonsRow] })
	}
}
