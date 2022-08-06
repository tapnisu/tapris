import { EmbedBuilder } from "discord.js";
import ytdl from "ytdl-core";
import { Command } from "../../Interfaces";

export const command: Command = {
	name: "queue",
	description: "Get current queue",
	run: async (client, interaction) => {
		if (!client.music.has(interaction.guildId))
			return await interaction.reply({
				content: "There is no queue for this server!",
				ephemeral: true
			});

		const music = client.music.get(interaction.guildId);
		if (client.music.get(interaction.guildId).queue.length == 0)
			return await interaction.reply({
				content: "The queue is empty now!",
				ephemeral: true
			});

		await interaction.deferReply();

		const embed = new EmbedBuilder().setTitle("Queue");

		embed.addFields(
			await Promise.all(
				music.queue.slice(0, 24).map(async (track) => {
					const info = await ytdl.getInfo(track);

					const date = new Date(0);
					date.setSeconds(Number(info.videoDetails.lengthSeconds));
					const timeString = date.toISOString().substr(11, 8);

					return { name: info.videoDetails.title, value: timeString };
				})
			)
		);

		return await interaction.followUp({ embeds: [embed] });
	}
};
