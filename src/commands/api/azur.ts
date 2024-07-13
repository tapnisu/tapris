import type { AzurResponse } from "#interfaces/azurLane.js";
import type { Command } from "#interfaces/index.js";
import getLocale from "#locales/index.js";
import axios from "axios";
import { EmbedBuilder } from "discord.js";

export const command: Command = {
  name: "azur",
  description: "Get data about Azur Lane",
  options: [
    {
      name: "name",
      description: "Name of ship",
      type: 3,
      required: true
    }
  ],
  disabled: true,
  run: async (client, interaction) => {
    const { azurLocale } = await getLocale(interaction.guildId);

    const request = encodeURI(
      interaction.options.getString("name").toLowerCase().replace(/ /g, "_")
    );

    const response = await (async () => {
      try {
        return (
          await axios.get<AzurResponse>(
            `https://raw.githubusercontent.com/alg-wiki/wikia/master/Ships/${request}.json`
          )
        ).data;
      } catch {
        return null;
      }
    })();

    if (!response)
      return await interaction.reply({
        content: azurLocale.shipNotFound,
        ephemeral: true
      });

    await interaction.deferReply();

    const embed = new EmbedBuilder()
      .setColor(client.env.BOT_COLOR)
      .setTitle(response.name)
      .setURL(`https://azurlane.koumakan.jp/wiki/${request}`)
      .setDescription(response.rarity)
      .addFields([
        { name: azurLocale.shipId, value: response.ID, inline: true },
        { name: azurLocale.shipHull, value: response.hull, inline: true },
        { name: azurLocale.shipNavy, value: response.navy, inline: true },
        { name: azurLocale.shipClass, value: response.class, inline: true },
        {
          name: azurLocale.shipVoiceActress,
          value: response.voiceActress,
          inline: true
        }
      ]);

    return await interaction.followUp({ embeds: [embed] });
  }
};
