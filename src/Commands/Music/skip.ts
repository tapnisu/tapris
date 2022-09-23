import { getGuild, updateGuild } from "@db/index";
import {
	DiscordGatewayAdapterCreator,
	joinVoiceChannel
} from "@discordjs/voice";
import { play } from "@Exports/music";
import { Command } from "@Interfaces/index";
import getLocale from "@Locales/index";
import { GuildMember } from "discord.js";

export const command: Command = {
	name: "skip",
	description: "Skip current music",
	guildsOnly: true,
	run: async (client, interaction) => {
		await interaction.deferReply();

		const { skipLocale } = await getLocale(interaction.guildId);
		const guild = await getGuild(interaction.guildId);

		guild.queue.shift();
		updateGuild(guild);

		if (guild.queue.length == 0)
			return await interaction.followUp({
				content: skipLocale.emptyQueue
			});

		const connection = joinVoiceChannel({
			channelId: (interaction.member as GuildMember).voice.channel.id,
			guildId: interaction.guildId,
			adapterCreator: interaction.guild
				.voiceAdapterCreator as unknown as DiscordGatewayAdapterCreator
		});

		await interaction.followUp(skipLocale.success);
		return play(client, interaction, guild, connection);
	}
};
