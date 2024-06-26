import { getGuild, updateGuild } from "#db/index.js";
import type { Command } from "#interfaces/index.js";
import { play } from "#lib/music.js";
import getLocale from "#locales/index.js";
import {
  type DiscordGatewayAdapterCreator,
  joinVoiceChannel
} from "@discordjs/voice";
import type { GuildMember } from "discord.js";

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
