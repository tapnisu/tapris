import { getGuild, updateGuild } from "@db/index";
import {
	DiscordGatewayAdapterCreator,
	joinVoiceChannel
} from "@discordjs/voice";
import { Command } from "@Interfaces/index";
import getLocale from "@Locales/index";
import { GuildMember } from "discord.js";

export const command: Command = {
	name: "leave",
	description: "Exit the voice channel",
	guildsOnly: true,
	run: async (client, interaction) => {
		const { leaveLocale } = await getLocale(interaction.guildId);

		if (!(interaction.member as GuildMember).voice.channel.id)
			await interaction.reply({
				content: leaveLocale.notInChannel,
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

		return await interaction.followUp(leaveLocale.success);
	}
};
