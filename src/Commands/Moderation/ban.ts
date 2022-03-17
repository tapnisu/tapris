import { Command } from '../../Interfaces'

export const command: Command = {
	name: 'ban',
	description: 'Ban the user',
	options: [
		{
			name: 'user',
			description: 'User to be banned',
			type: 6,
			required: true
		}
	],
	run: async (client, interaction) => {
		const member = interaction.options.getUser('user')
		const userMember = interaction.guild.members.cache.get(interaction.user.id)

		if (
			!userMember.permissions.has('ADMINISTRATOR') ||
			!userMember.permissions.has('BAN_MEMBERS')
		)
			return interaction.createMessage({
				content: 'You can`t ban members :no_entry_sign:',
				flags: 64
			})
		if (!member)
			return interaction.createMessage({
				content: 'User is not found :no_entry_sign:',
				flags: 64
			})

		const target = interaction.guild.members.cache.get(member.id)

		if (target.roles.highest.position >= userMember.roles.highest.position)
			return interaction.createMessage({
				content: 'User has higher (or same) role then you :no_entry_sign:',
				flags: 64
			})

		target
			.ban()
			.then(() => {
				return interaction.createMessage(`<@!${member.id}> was banned :door:`)
			})
			.catch(() => {
				return interaction.createMessage({
					content: `<@!${member.id}> was **NOT** banned :no_entry_sign:`,
					flags: 64
				})
			})
	}
}
