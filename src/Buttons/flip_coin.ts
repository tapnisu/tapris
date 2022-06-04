import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js'
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

		const buttonsRow = new ActionRowBuilder().addComponents([
			new ButtonBuilder()
				.setCustomId(`flip_coin_${choices[0]}`)
				.setLabel(`Select ${choices[0]}`)
				.setStyle(ButtonStyle.Primary),
			new ButtonBuilder()
				.setCustomId(`flip_coin_${choices[1]}`)
				.setLabel(`Select ${choices[1]}`)
				.setStyle(ButtonStyle.Primary)
		])

		return interaction.update({
			embeds: [embed],
			components: [buttonsRow]
		})
	}
}
