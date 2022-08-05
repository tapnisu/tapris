import { Command } from "../../Interfaces";

export const command: Command = {
	name: "leave",
	description: "Exit the voice channel",
	run: async (client, interaction) => {
		if (!client.music.has(interaction.guildId))
			await interaction.reply({
				content: "You aren`t in channel! :(",
				ephemeral: true
			});

		client.music.get(interaction.guildId).connection.destroy();
		client.music.delete(interaction.guildId);

		await interaction.deferReply();

		return await interaction.followUp("Successfully quit the channel! :door:");
	}
};
