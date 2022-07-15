import {
	DiscordGatewayAdapterCreator,
	joinVoiceChannel
} from "@discordjs/voice";

import { Command } from "../../Interfaces";
import { GuildMember } from "discord.js";
import { play } from "../../Exports/music";

export const command: Command = {
	name: "start",
	description: "Play music from the queue",
	run: async (client, interaction) => {
		if (!(interaction.member as GuildMember).voice)
			return await interaction.reply("You are not in voice channel! :(");
		if (
			!client.music.has(interaction.guildId) ||
			client.music.get(interaction.guildId).queue.length == 0
		)
			return await interaction.reply("Queue is empty :no_entry_sign:");

		const music = client.music.get(interaction.guildId);
		music.connection = joinVoiceChannel({
			channelId: (interaction.member as GuildMember).voice.channel.id,
			guildId: interaction.guildId,
			adapterCreator: interaction.guild
				.voiceAdapterCreator as unknown as DiscordGatewayAdapterCreator
		});

		client.music.set(interaction.guildId, music);

		await interaction.reply("Starting...");
		return play(client, interaction, client.music.get(interaction.guildId));
	}
};
