import type { GIPNResponse } from "#interfaces/genshinCodes.js";
import type { Command } from "#interfaces/index.js";
import axios from "axios";
import { EmbedBuilder } from "discord.js";

export const command: Command = {
  name: "genshincodes",
  description: "Codes for Genshin Impact",
  run: async (client, interaction, i18n) => {
    await interaction.deferReply();

    const res = await axios.get<GIPNResponse>(
      "https://raw.githubusercontent.com/ataraxyaffliction/ataraxyaffliction.github.io/main/re/promos.json"
    );
    const codes = res.data.CODES.filter((code) => !code.expired);

    const embed = new EmbedBuilder()
      .setColor(client.env.BOT_COLOR)
      .setTitle(i18n.__("genshinCodes_title"))
      .setDescription(i18n.__("genshinCodes_description"))
      .setURL(i18n.__("genshinCodes_url"))
      .addFields(
        codes.map((code) => ({
          name: `\`${code.code}\` (${code.period})`,
          value: code.rewards
            .map((reward) => `${reward.reward}: ${reward.quantity}`)
            .join("\n"),
          inline: true
        }))
      );

    return await interaction.followUp({ embeds: [embed] });
  }
};
