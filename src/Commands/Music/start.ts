import {
  DiscordGatewayAdapterCreator,
  joinVoiceChannel
} from "@discordjs/voice";
import { GuildMember } from "discord.js";
import { play } from "../../Exports/music.js";
import { Command } from "../../Interfaces/index.js";
import getLocale from "../../Locales/index.js";
import { getGuild } from "../../db.js";

export const command: Command = {
  name: "start",
  description: "Play music from the queue",
  guildsOnly: true,
  run: async (client, interaction) => {
    const { startLocale } = await getLocale(interaction.guildId);

    if (!(interaction.member as GuildMember).voice)
      return await interaction.reply(startLocale.notInChannel);

    const guild = await getGuild(interaction.guildId);

    if (guild.queue.length == 0)
      return await interaction.reply(startLocale.emptyQueue);

    await interaction.deferReply();

    const connection = joinVoiceChannel({
      channelId: (interaction.member as GuildMember).voice.channel.id,
      guildId: interaction.guildId,
      adapterCreator: interaction.guild
        .voiceAdapterCreator as unknown as DiscordGatewayAdapterCreator
    });

    await interaction.followUp(startLocale.starting);
    return play(client, interaction, guild, connection);
  }
};
