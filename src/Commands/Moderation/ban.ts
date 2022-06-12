import { Command } from "../../Interfaces";

export const command: Command = {
	name: "ban",
	description: "Ban the user",
	options: [
		{
			name: "user",
			description: "User to be banned",
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
			!userMember.permissions.has("BanMembers")
		)
			return interaction.reply({
				content: "You can`t ban members :no_entry_sign:",
				ephemeral: true
			});
		if (!member)
			return interaction.reply({
				content: "User is not found :no_entry_sign:",
				ephemeral: true
			});

		const target = interaction.guild.members.cache.get(member.id);

		if (target.roles.highest.position >= userMember.roles.highest.position)
			return interaction.reply({
				content: "User has higher (or same) role then you :no_entry_sign:",
				ephemeral: true
			});

		target
			.ban({ reason: reason ? reason : null })
			.then(() => {
				return interaction.reply(`<@!${member.id}> was banned :door:`);
			})
			.catch(() => {
				return interaction.reply({
					content: `<@!${member.id}> was **NOT** banned :no_entry_sign:`,
					ephemeral: true
				});
			});
	}
};
