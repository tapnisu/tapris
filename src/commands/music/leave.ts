import { getGuild, updateGuild } from "#db/index.js";
import type { Command } from "#interfaces/index.js";
import getLocale from "#locales/index.js";
import {
  type DiscordGatewayAdapterCreator,
  joinVoiceChannel
} from "@discordjs/voice";
import type { GuildMember } from "discord.js";

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

    return await interaction.reply(leaveLocale.success);
  }
};
