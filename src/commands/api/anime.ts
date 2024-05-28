import { Command } from "#interfaces/index.js";
import { KitsuResponse, KitsuResponseItem } from "#interfaces/kitsu.js";
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
    const request = interaction.options.getString("name");
    const response: KitsuResponse = (
      await axios.get(
        `https://kitsu.io/api/edge/anime?filter[text]=${encodeURI(request)}`
      )
    ).data;

    if (response.data.length == 0)
      return await interaction.reply({
        content: i18n.__("anime_animeNotFound"),
        ephemeral: true
      });

    await interaction.deferReply();

    const anime: KitsuResponseItem = response.data[0];

    const Embed = new EmbedBuilder()
      .setColor(client.env.BOT_COLOR)
      .setTitle(anime.attributes?.canonicalTitle)
      .setDescription(anime.attributes?.description)
      .setImage(anime.attributes?.posterImage?.original)
      .addFields([
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
      ])
      .setTimestamp(new Date(anime.attributes?.startDate));

    return await interaction.followUp({ embeds: [Embed] });
  }
};
