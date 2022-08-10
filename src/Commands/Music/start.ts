import {
	DiscordGatewayAdapterCreator,
	joinVoiceChannel
} from "@discordjs/voice";

import { GuildMember } from "discord.js";
import { getGuild } from "../../db";
import { play } from "../../Exports/music";
import { Command } from "../../Interfaces";

export const command: Command = {
	name: "start",
	description: "Play music from the queue",
	run: async (client, interaction) => {
		if (!(interaction.member as GuildMember).voice)
			return await interaction.reply("You are not in voice channel! :(");

		const guild = await getGuild(interaction.guildId);

		if (guild.queue.length == 0)
			return await interaction.reply("Queue is empty! :no_entry_sign:");

		const connection = joinVoiceChannel({
			channelId: (interaction.member as GuildMember).voice.channel.id,
			guildId: interaction.guildId,
			adapterCreator: interaction.guild
				.voiceAdapterCreator as unknown as DiscordGatewayAdapterCreator
		});

		await interaction.deferReply();

		await interaction.followUp("Starting...");
		return play(client, interaction, guild, connection);
	}
};
