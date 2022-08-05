import { Command } from "../../Interfaces";
import { play } from "../../Exports/music";

export const command: Command = {
	name: "skip",
	description: "Skip current music",
	run: async (client, interaction) => {
		if (!client.music.has(interaction.guildId))
			return await interaction.reply({
				content: "There is no queue for this server!",
				ephemeral: true
			});
		if (client.music.get(interaction.guildId).queue.length == 0)
			return await interaction.reply({
				content: "The queue is already empty!",
				ephemeral: true
			});

		const music = client.music.get(interaction.guildId);
		music.queue.shift();
		music.player.pause();
		client.music.set(interaction.guildId, music);

		await interaction.deferReply();

		await interaction.followUp("Skipped :musical_note:");
		return play(client, interaction, music);
	}
};
