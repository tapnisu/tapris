import {
	DiscordGatewayAdapterCreator,
	joinVoiceChannel
} from "@discordjs/voice";
import { GuildMember } from "discord.js";
import { getGuild, updateGuild } from "../../db";
import { play } from "../../Exports/music";
import { Command } from "../../Interfaces";

export const command: Command = {
	name: "skip",
	description: "Skip current music",
	run: async (client, interaction) => {
		await interaction.deferReply();
    
		const guild = await getGuild(interaction.guildId);

		guild.queue.shift();
		updateGuild(guild);

		if (guild.queue.length == 0)
			return await interaction.followUp({
				content: "The queue is empty now!"
			});
      
		const connection = joinVoiceChannel({
			channelId: (interaction.member as GuildMember).voice.channel.id,
			guildId: interaction.guildId,
			adapterCreator: interaction.guild
				.voiceAdapterCreator as unknown as DiscordGatewayAdapterCreator
		});

		await interaction.followUp("Skipped :musical_note:");
		return play(client, interaction, guild, connection);
	}
};
