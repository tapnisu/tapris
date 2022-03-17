import { Command } from '../../Interfaces'

export const command: Command = {
	name: 'kick',
	description: 'Kick the user',
	options: [
		{
			name: 'user',
			description: 'User to be kicked',
			type: 6,
			required: true
		}
	],
	run: async (client, interaction) => {
		const member = interaction.options.getUser('user')
		const userMember = interaction.guild.members.cache.get(interaction.user.id)

		if (
			!userMember.permissions.has('ADMINISTRATOR') ||
			!userMember.permissions.has('KICK_MEMBERS')
		)
			return interaction.createMessage({
				content: 'You can`t kick members :no_entry_sign:',
				flags: 64
			})

		const target = interaction.guild.members.cache.get(member.id)

		if (target.roles.highest.position >= userMember.roles.highest.position)
			return interaction.createMessage({
				content: 'User has higher (or same) role then you :no_entry_sign:',
				flags: 64
			})

		target
			.kick()
			.then(() => {
				return interaction.createMessage(`<@!${member.id}> was kicked :door: `)
			})
			.catch(() => {
				return interaction.createMessage({
					content: `<@!${member.id}> was **NOT** kicked :no_entry_sign: `,
					flags: 64
				})
			})
	}
}
