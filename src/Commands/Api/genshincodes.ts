import axios from "axios";
import { EmbedBuilder } from "discord.js";
import { Command } from "../../Interfaces";
import { Code } from "../../Interfaces/GIPN";
import getLocale from "../../Locales";

export const command: Command = {
  name: "genshincodes",
  description: "Codes for Genshin Impact",
  disabled: true,
  run: async (client, interaction) => {
    await interaction.deferReply();

    const response: Code[] = (
      await axios.get(
        "https://raw.githubusercontent.com/ataraxyaffliction/gipn-json/main/gipn.json"
      )
    ).data.CODES;

    const { genshincodesLocale } = await getLocale(interaction.guildId);

    const Embed = new EmbedBuilder()
      .setColor(client.env.BOT_COLOR)
      .setTitle(genshincodesLocale.title)
      .setDescription(genshincodesLocale.description)
      .setURL(genshincodesLocale.url);

    response.forEach((code) => {
      if (code.is_expired == false) {
        let rewards: string[] = [];

        code.reward_array.forEach((reward) => {
          rewards = [...rewards, `${reward.name}: ${reward.count}`];
        });

        Embed.addFields([
          { name: code.code, value: rewards.join("\n"), inline: true }
        ]);
      }
    });

    return await interaction.followUp({ embeds: [Embed] });
  }
};
