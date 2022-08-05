import { Command } from "../../Interfaces";

export const command: Command = {
	name: "kick",
	description: "Kick the user",
	options: [
		{
			name: "user",
			description: "User to be kicked",
			type: 6,
			required: true
		},
		{
			name: "reason",
			description: "Reason to be shown",
			type: 3,
			required: false
		}
	],
	run: async (client, interaction) => {
		const member = interaction.options.getUser("user");
		const reason = interaction.options.getString("reason");
		const userMember = interaction.guild.members.cache.get(interaction.user.id);

		if (
			!userMember.permissions.has("Administrator") ||
			!userMember.permissions.has("KickMembers")
		)
			return await interaction.reply({
				content: "You can`t kick members :no_entry_sign:",
				ephemeral: true
			});

		const target = interaction.guild.members.cache.get(member.id);

		if (target.roles.highest.position >= userMember.roles.highest.position)
			return await interaction.reply({
				content: "User has higher (or same) role then you :no_entry_sign:",
				ephemeral: true
			});

		target
			.kick(reason ? reason : null)
			.then(async () => {
				await interaction.deferReply();

				return await interaction.followUp(
					`<@!${member.id}> was kicked :door: `
				);
			})
			.catch(async () => {
				return await interaction.reply({
					content: `<@!${member.id}> was **NOT** kicked :no_entry_sign: `,
					ephemeral: true
				});
			});
	}
};
