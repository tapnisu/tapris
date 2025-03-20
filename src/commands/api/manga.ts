import type { Command } from "#interfaces/index.js";
import type { SearchResult } from "#interfaces/manga.js";
import getLocale from "#locales/index.js";
import axios from "axios";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} from "discord.js";

export const command: Command = {
  name: "manga",
  description: "Get data about manga",
  options: [
    {
      name: "query",
      description: "Query for search",
      type: 3,
      required: true
    }
  ],
  run: async (client, interaction) => {
    const query = interaction.options.getString("query");
    const { mangaLocale } = await getLocale(interaction.guildId);

    const response = (
      await axios.get<SearchResult[]>(
        `https://www.nelomanga.com/home/search/json?searchword=${encodeURIComponent(query.replaceAll(" ", "_"))}`
      )
    ).data;

    if (response.length == 0)
      return await interaction.reply({
        content: mangaLocale.notFound,
        ephemeral: true
      });

    await interaction.deferReply();

    const embed = new EmbedBuilder()
      .setColor(client.env.BOT_COLOR)
      .setTitle(response[0].name)
      .addFields({
        name: mangaLocale.lastChapter,
        value: response[0].chapterLatest,
        inline: true
      })
      .setImage(response[0].thumb)
      .setURL(response[0].url)
      .setAuthor({ name: response[0].author });

    const buttonsRow = new ActionRowBuilder<ButtonBuilder>().addComponents([
      new ButtonBuilder()
        .setURL(response[0].url)
        .setLabel(mangaLocale.readManga)
        .setStyle(ButtonStyle.Link)
    ]);

    return await interaction.followUp({
      embeds: [embed],
      components: [buttonsRow]
    });
  }
};
