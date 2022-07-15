import { Command } from "../../Interfaces";
import { Music } from "../../Exports/music";
import { validateURL } from "ytdl-core";
import youtubeSr from "youtube-sr";

export const command: Command = {
	name: "add",
	description: "Add YouTube Music to Queue",
	options: [
		{
			name: "type",
			description: "Type of data you want to get",
			choices: [
				{ name: "video url", value: "video-url" },
				{ name: "video title", value: "video-title" },
				{ name: "playlist name", value: "playlist-name" },
				{ name: "playlist url", value: "playlist-url" }
			],
			type: 3,
			required: true
		},
		{
			name: "request",
			description: "Video url / title / playlist url",
			type: 3,
			required: true
		}
	],
	run: async (client, interaction) => {
		const type = interaction.options.getString("type");
		const request = interaction.options.getString("request");

		if (!client.music.has(interaction.guildId))
			client.music.set(interaction.guildId, new Music([], null));

		const music = client.music.get(interaction.guildId);

		if (type == "video-url") {
			if (validateURL(request)) {
				music.queue = [...music.queue, request];
				client.music.set(interaction.guildId, music);
			} else
				return await interaction.reply({
					content: "Url is invalid! :no_entry_sign:",
					ephemeral: true
				});
		}

		if (type == "video-title") {
			const result = await youtubeSr.search(request, {
				limit: 1,
				type: "video"
			});

			if (result.length == 0)
				return await interaction.reply({
					content: "Music not found! :no_entry_sign:",
					ephemeral: true
				});

			music.queue = [...music.queue, result[0].id];
			client.music.set(interaction.guildId, music);
		}

		if (type == "playlist-name") {
			const result = await youtubeSr.search(request, {
				limit: 1,
				type: "playlist"
			});

			if (result.length == 0)
				return await interaction.reply({
					content: "Playlist not found! :no_entry_sign:",
					ephemeral: true
				});

			music.queue = [
				...music.queue,
				...(
					await (await youtubeSr.getPlaylist(result[0].url)).fetch()
				).videos.map((video) => video.id)
			];
			client.music.set(interaction.guildId, music);
		}

		if (type == "playlist-url") {
			try {
				music.queue = [
					...music.queue,
					...(await (await youtubeSr.getPlaylist(request)).fetch()).videos.map(
						(video) => video.id
					)
				];
				client.music.set(interaction.guildId, music);
			} catch {
				return await interaction.reply({
					content: "Playlist not found! :no_entry_sign:",
					ephemeral: true
				});
			}
		}

		return await interaction.reply("Added to queue :musical_note:");
	}
};
