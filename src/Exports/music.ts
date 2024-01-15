import {
	AudioPlayer,
	AudioPlayerStatus,
	createAudioResource,
	StreamType,
	VoiceConnection
} from "@discordjs/voice";
import { Guild } from "@prisma/client";
import { CommandInteraction, EmbedBuilder } from "discord.js";
import ytdl from "ytdl-core";
import Client from "../Core/index";
import { updateGuild } from "../db";
import getLocale from "../Locales";

export class Music {
  public queue: string[];
  public connection: VoiceConnection | null;
  public player: AudioPlayer;

  constructor(queue: string[], connection: VoiceConnection | null) {
    this.queue = queue;
    this.connection = connection;
    this.player = new AudioPlayer();
  }
}

export const play = async (
  client: Client,
  interaction: CommandInteraction,
  guild: Guild,
  connection: VoiceConnection
) => {
  const { musicLocale } = await getLocale(guild.id);

  if (guild.queue.length == 0)
    return await interaction.followUp({
      content: musicLocale.emptyQueue
    });

  const stream = ytdl(guild.queue[0], {
    filter: "audioonly"
  });
  const resource = createAudioResource(stream, {
    inputType: StreamType.Arbitrary
  });

  const info = await ytdl.getInfo(guild.queue[0]);

  const date = new Date(0);
  date.setSeconds(Number(info.videoDetails.lengthSeconds));
  const timeString = date.toISOString().substr(11, 8);

  const Embed = new EmbedBuilder()
    .setColor(client.env.BOT_COLOR)
    .setTitle(info.videoDetails.title)
    .setURL(info.videoDetails.video_url)
    .setDescription(info.videoDetails.description ?? musicLocale.noDescription)
    .addFields([
      {
        name: musicLocale.views,
        value: info.videoDetails.viewCount,
        inline: true
      },
      {
        name: musicLocale.likes,
        value: String(info.videoDetails.likes),
        inline: true
      },
      {
        name: musicLocale.length,
        value: timeString,
        inline: true
      }
    ])
    .setImage(info.videoDetails.thumbnails.at(-1).url)
    .setTimestamp(new Date(info.videoDetails.publishDate));

  await interaction.followUp({ embeds: [Embed] });

  const player = new AudioPlayer();

  player.play(resource);
  connection.subscribe(player);

  player.on(AudioPlayerStatus.Idle, () => {
    guild.queue.shift();
    updateGuild(guild);

    return play(client, interaction, guild, connection);
  });

  player.on("error", async () => {
    player.stop();

    await interaction.followUp(musicLocale.unknownError);
  });
};
