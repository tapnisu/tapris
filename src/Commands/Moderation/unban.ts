import { Command } from "../../Interfaces";

export const command: Command = {
	name: "unban",
	description: "Unban the user",
	options: [
		{
			name: "id",
			description: "User id to be unbanned",
			type: 4,
			required: true
		}
	],
	run: async (client, interaction) => {
		const userMember = interaction.guild.members.cache.get(interaction.user.id);
		const userId = String(interaction.options["id"]);

		if (
			!userMember.permissions.has("Administrator") ||
			!userMember.permissions.has("BanMembers")
		)
			return await interaction.reply({
				content: "You can`t unban members! :no_entry_sign:",
				ephemeral: true
			});

		interaction.guild.members
			.unban(userId)
			.then(async () => {
				return await interaction.reply(`<@!${userId}> was unbanned :door:`);
			})
			.catch(async () => {
				return await interaction.reply({
					content: `<@!${userId}> was **NOT** unbanned! :no_entry_sign:`,
					ephemeral: true
				});
			});
	}
};
