import { TextChannel } from 'eris'
import { Command } from '../../Interfaces'

export const command: Command = {
	name: 'clear',
	description: 'Clearing messages',
	options: [
		{
			name: 'amount',
			description: 'Amount of messages to be deleted',
			type: 4,
			required: true
		}
	],
	run: async (client, interaction) => {
		const amount = interaction.options.getInteger('amount')
		const channel = interaction.channel as TextChannel
		const userMember = interaction.guild.members.cache.get(interaction.user.id)

		if (!userMember.permissions.has('MANAGE_MESSAGES'))
			return interaction.createMessage({
				content: 'You can`t delete messages :no_entry_sign:',
				flags: 64
			})
		if (amount > 100)
			return interaction.createMessage({
				content:
					'You cannot delete more than 100 posts at a time :no_entry_sign:',
				flags: 64
			})
		if (amount < 1)
			return interaction.createMessage({
				content: 'You must enter a number greater than 1 :no_entry_sign:',
				flags: 64
			})

		channel
			.bulkDelete(amount, true)
			.catch(() =>
				interaction.createMessage({
					content:
						'You cannot delete messages older than 14 days :no_entry_sign:',
					flags: 64
				})
			)
			.then(() =>
				interaction.createMessage({
					content: `Deleted ${amount} messages :wastebasket:`,
					flags: 64
				})
			)
	}
}
