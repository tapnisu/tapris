import { Command } from '../../Interfaces'

export const command: Command = {
	name: 'unban',
	description: 'Unban the user',
	options: [
		{
			name: 'id',
			description: 'User id to be unbanned',
			type: 4,
			required: true
		}
	],
	run: async (client, interaction) => {
		const userMember = interaction.guild.members.cache.get(interaction.user.id)
		const userId = String(interaction.options.getInteger('id'))

		if (
			!userMember.permissions.has('ADMINISTRATOR') ||
			!userMember.permissions.has('BAN_MEMBERS')
		)
			return interaction.createMessage({
				content: 'You can`t unban members! :no_entry_sign:',
				flags: 64
			})

		interaction.guild.members
			.unban(userId)
			.then(() => {
				return interaction.createMessage(`<@!${userId}> was unbanned :door:`)
			})
			.catch(() => {
				return interaction.createMessage({
					content: `<@!${userId}> was **NOT** unbanned! :no_entry_sign:`,
					flags: 64
				})
			})
	}
}
