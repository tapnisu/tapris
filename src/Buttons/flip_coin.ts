import { MessageActionRow, MessageButton, EmbedBuilder } from 'discord.js'
import { Button } from '../Interfaces'

export const button: Button = {
	customId: /flip_coin_(.*)/gi,
	run: async (client, interaction) => {
		const choice = interaction.customId.replace(/flip_coin_/, '')

		const choices = ['сoin', 'tail']
		const winner: string = choices[Math.floor(Math.random() * 2)]

		const embed = new EmbedBuilder()
			.setTitle(`${winner == choices[0] ? choices[0] : choices[1]} won!`)
			.setColor(client.env.BOT_COLOR)
			.setDescription(
				`${winner.toLocaleLowerCase() == choice ? 'You won!' : 'You lost!'}`
			)

		const buttonsRow = new MessageActionRow().addComponents([
			new MessageButton()
				.setCustomId(`flip_coin_${choices[0]}`)
				.setLabel(`Select ${choices[0]}`)
				.setStyle('PRIMARY'),
			new MessageButton()
				.setCustomId(`flip_coin_${choices[1]}`)
				.setLabel(`Select ${choices[1]}`)
				.setStyle('PRIMARY')
		])

		return interaction.update({
			embeds: [embed],
			components: [buttonsRow]
		})
	}
}
