import {
  DiscordGatewayAdapterCreator,
  joinVoiceChannel
} from "@discordjs/voice";
import { GuildMember } from "discord.js";
import { Command } from "../../Interfaces";
import getLocale from "../../Locales";
import { getGuild, updateGuild } from "../../db";

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
    await updateGuild(guild);

    await interaction.deferReply();

    return await interaction.followUp(leaveLocale.success);
  }
};
