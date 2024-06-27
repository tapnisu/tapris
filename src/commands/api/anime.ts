import type { Command } from "#interfaces/index.js";
import type { KitsuResponse } from "#interfaces/kitsu.js";
import axios from "axios";
import { EmbedBuilder } from "discord.js";

export const command: Command = {
  name: "anime",
  description: "Sends anime description and image",
  options: [
    {
      name: "name",
      description: "Name of anime",
      type: 3,
      required: true
    }
  ],
  run: async (client, interaction, i18n) => {
    await interaction.deferReply();

    const name = interaction.options.getString("name");
    const res = await axios.get<KitsuResponse>(
      `https://kitsu.io/api/edge/anime?filter[text]=${encodeURI(name)}`
    );

    if (res.data.data.length == 0)
      return await interaction.reply({
        content: i18n.__("anime_animeNotFound")
      });

    const anime = res.data.data[0];
    const embed = new EmbedBuilder()
      .setColor(client.env.BOT_COLOR)
      .setTitle(anime.attributes?.canonicalTitle)
      .setDescription(anime.attributes?.description)
      .setImage(anime.attributes?.posterImage?.original)
      .addFields(
        {
          name: i18n.__("anime_averageRating"),
          value: anime.attributes?.averageRating,
          inline: true
        },
        {
          name: i18n.__("anime_ageRating"),
          value:
            anime.attributes?.ageRatingGuide?.toString() ??
            i18n.__("anime_unknown"),
          inline: true
        },
        {
          name: i18n.__("anime_nsfw"),
          value: anime.attributes?.nsfw?.toString(),
          inline: true
        },
        {
          name: i18n.__("anime_episodeCount"),
          value:
            anime.attributes?.episodeCount?.toString() ??
            i18n.__("anime_unknown"),
          inline: true
        },
        {
          name: i18n.__("anime_episodeLength"),
          value:
            anime.attributes?.episodeLength.toString() ??
            i18n.__("anime_unknown"),
          inline: true
        }
      )
      .setTimestamp(new Date(anime.attributes?.startDate));

    return await interaction.followUp({ embeds: [embed] });
  }
};
