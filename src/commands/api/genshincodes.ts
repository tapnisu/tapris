import { GIPNResponse } from "#interfaces/genshinCodes.js";
import { Command } from "#interfaces/index.js";
import getLocale from "#locales/index.js";
import axios from "axios";
import { EmbedBuilder } from "discord.js";

export const command: Command = {
  name: "genshincodes",
  description: "Codes for Genshin Impact",
  disabled: true,
  run: async (client, interaction) => {
    await interaction.deferReply();

    const res = await axios.get<GIPNResponse>(
      "https://raw.githubusercontent.com/ataraxyaffliction/gipn-json/main/gipn.json"
    );
    const codes = res.data.CODES.filter((code) => code.is_expired);

    const { genshincodesLocale } = await getLocale(interaction.guildId);

    const embed = new EmbedBuilder()
      .setColor(client.env.BOT_COLOR)
      .setTitle(genshincodesLocale.title)
      .setDescription(genshincodesLocale.description)
      .setURL(genshincodesLocale.url)
      .addFields(
        codes.map((code) => ({
          name: code.code,
          value: code.reward_array
            .map((reward) => `${reward.name}: ${reward.count}`)
            .join("\n"),
          inline: true
        }))
      );

    return await interaction.followUp({ embeds: [embed] });
  }
};
