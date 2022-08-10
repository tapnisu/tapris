import {
	DiscordGatewayAdapterCreator,
	joinVoiceChannel
} from "@discordjs/voice";
import { GuildMember } from "discord.js";
import { getGuild, updateGuild } from "../../db";
import { Command } from "../../Interfaces";

export const command: Command = {
	name: "leave",
	description: "Exit the voice channel",
	run: async (client, interaction) => {
		if (!(interaction.member as GuildMember).voice.channel.id)
			await interaction.reply({
				content: "You aren`t in channel! :(",
				ephemeral: true
			});

		const connection = joinVoiceChannel({
			channelId: (interaction.member as GuildMember).voice.channel.id,
			guildId: interaction.guildId,
			adapterCreator: interaction.guild
				.voiceAdapterCreator as unknown as DiscordGatewayAdapterCreator
		});

		connection.destroy();
		const guild = await getGuild(interaction.guildId);
		guild.queue = [];
		updateGuild(guild);

		await interaction.deferReply();

		return await interaction.followUp("Successfully quit the channel! :door:");
	}
};
