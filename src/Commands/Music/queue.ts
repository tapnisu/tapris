import { EmbedBuilder } from "discord.js";
import ytdl from "ytdl-core";
import { getGuild } from "../../db";
import { Command } from "../../Interfaces";
import getLocale from "../../Locales";

export const command: Command = {
	name: "queue",
	description: "Get current queue",
	run: async (client, interaction) => {
		const { queueLocale } = await getLocale(interaction.guildId);

		const guild = await getGuild(interaction.guildId);

		if (guild.queue.length == 0)
			return await interaction.reply({
				content: queueLocale.emptyQueue(),
				ephemeral: true
			});

		await interaction.deferReply();

		const embed = new EmbedBuilder().setTitle(queueLocale.queue());

		embed.addFields(
			await Promise.all(
				guild.queue.slice(0, 24).map(async (track) => {
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
