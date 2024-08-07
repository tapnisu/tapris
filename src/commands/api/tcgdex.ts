import type { Command } from "#interfaces/index.js";
import type { Datum, PokemontcgResponse } from "#interfaces/pokemonTcg.js";
import getLocale from "#locales/index.js";
import axios from "axios";
import { EmbedBuilder } from "discord.js";

export const command: Command = {
  name: "tcgdex",
  description: "Get pokemon card data TCG",
  options: [
    {
      name: "name",
      description: "Card name",
      type: 3,
      required: true
    }
  ],
  run: async (client, interaction) => {
    const name = interaction.options.getString("name");
    const { tcgdexLocale } = await getLocale(interaction.guildId);

    const response = await (async () => {
      try {
        return (
          await axios.get<PokemontcgResponse>(
            `https://api.pokemontcg.io/v2/cards?q=name:${encodeURI(name)}`
          )
        ).data;
      } catch {
        return null;
      }
    })();

    if (!response)
      return await interaction.reply({
        content: tcgdexLocale.notFound,
        ephemeral: true
      });

    const data: Datum = response.data[0];

    await interaction.deferReply();

    const embed = new EmbedBuilder()
      .setColor(client.env.BOT_COLOR)
      .setTitle(`${data.supertype}: ${data.name}`)
      .setDescription(`${data.set.series}: ${data.set.name}`)
      .setThumbnail(data.set.images.symbol)
      .addFields({
        name: tcgdexLocale.rarity,
        value: data.rarity,
        inline: true
      })
      .setImage(data.images.large)
      .setTimestamp(new Date(data.set.releaseDate));

    return await interaction.followUp({ embeds: [embed] });
  }
};
