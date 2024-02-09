import axios from "axios";
import { EmbedBuilder } from "discord.js";
import { AzurResponse } from "../../Interfaces/Azur.js";
import { Command } from "../../Interfaces/index.js";
import getLocale from "../../Locales/index.js";

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

    try {
      const response: AzurResponse = (
        await axios.get(
          `https://raw.githubusercontent.com/alg-wiki/wikia/master/Ships/${request}.json`
        )
      ).data;

      await interaction.deferReply();

      const Embed = new EmbedBuilder()
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

      return await interaction.followUp({ embeds: [Embed] });
    } catch {
      return await interaction.reply({
        content: azurLocale.shipNotFound,
        ephemeral: true
      });
    }
  }
};
