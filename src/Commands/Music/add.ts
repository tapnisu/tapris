import youtubeSr from "youtube-sr";
import { validateURL } from "ytdl-core";
import { getGuild, updateGuild } from "../../db";
import { Command } from "../../Interfaces";
import getLocale from "../../Locales";

export const command: Command = {
  name: "add",
  description: "Add YouTube Music to Queue",
  options: [
    {
      name: "type",
      description: "Type of data you want to get",
      choices: [
        { name: "video url", value: "video-url" },
        { name: "video title", value: "video-title" },
        { name: "playlist name", value: "playlist-name" },
        { name: "playlist url", value: "playlist-url" }
      ],
      type: 3,
      required: true
    },
    {
      name: "request",
      description: "Video url / title / playlist url",
      type: 3,
      required: true
    }
  ],
  guildsOnly: true,
  run: async (client, interaction) => {
    await interaction.deferReply();

    const type = interaction.options.getString("type");
    const request = interaction.options.getString("request");

    const guild = await getGuild(interaction.guildId);
    const { addLocale } = await getLocale(interaction.guildId);

    if (type == "video-url") {
      if (!validateURL(request))
        return await interaction.followUp({
          content: addLocale.invalidUrl
        });

      guild.queue = [...guild.queue, request];
      updateGuild(guild);
    }

    if (type == "video-title") {
      const result = await youtubeSr.search(request, {
        limit: 1,
        type: "video"
      });

      if (result.length == 0)
        return await interaction.followUp({
          content: addLocale.videoNotFound
        });

      guild.queue = [...guild.queue, result[0].id];
      updateGuild(guild);
    }

    if (type == "playlist-name") {
      const result = await youtubeSr.search(request, {
        limit: 1,
        type: "playlist"
      });

      if (result.length == 0)
        return await interaction.followUp({
          content: addLocale.playlistNotFound
        });

      guild.queue = [
        ...guild.queue,
        ...(
          await (await youtubeSr.getPlaylist(result[0].url)).fetch()
        ).videos.map((video) => video.id)
      ];

      updateGuild(guild);
    }

    if (type == "playlist-url") {
      try {
        guild.queue = [
          ...guild.queue,
          ...(await (await youtubeSr.getPlaylist(request)).fetch()).videos.map(
            (video) => video.id
          )
        ];

        updateGuild(guild);
      } catch {
        return await interaction.followUp({
          content: addLocale.playlistNotFound
        });
      }
    }

    return await interaction.followUp(addLocale.success);
  }
};
