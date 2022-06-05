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
		},
		{
			name: 'reason',
			description: 'Reason to be shown',
			type: 3,
			required: false
		}
	],
	run: async (client, interaction) => {
		const member = interaction.options.getUser('user')
		const reason = interaction.options.getString('reason')
		const userMember = interaction.guild.members.cache.get(interaction.user.id)

		if (
			!userMember.permissions.has('Administrator') ||
			!userMember.permissions.has('KickMembers')
		)
			return interaction.followUp({
				content: 'You can`t kick members :no_entry_sign:',
				ephemeral: true
			})

		const target = interaction.guild.members.cache.get(member.id)

		if (target.roles.highest.position >= userMember.roles.highest.position)
			return interaction.followUp({
				content: 'User has higher (or same) role then you :no_entry_sign:',
				ephemeral: true
			})

		target
			.kick(reason ? reason : null)
			.then(() => {
				return interaction.followUp(`<@!${member.id}> was kicked :door: `)
			})
			.catch(() => {
				return interaction.followUp({
					content: `<@!${member.id}> was **NOT** kicked :no_entry_sign: `,
					ephemeral: true
				})
			})
	}
}
