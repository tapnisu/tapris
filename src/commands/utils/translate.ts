import { Command } from "#interfaces/index.js";
import getLocale from "#locales/index.js";
import translate from "@iamtraction/google-translate";
import { EmbedBuilder } from "discord.js";

export const command: Command = {
  name: "translate",
  description: "Translates text",
  options: [
    {
      name: "language",
      description: "Target language",
      type: 3,
      required: true
    },
    {
      name: "text",
      description: "Text to be translated",
      type: 3,
      required: true
    }
  ],
  run: async (client, interaction) => {
    const language = interaction.options.getString("language");
    const text = interaction.options.getString("text");

    const { translateLocale } = await getLocale(interaction.guildId);

    const response = await (async () => {
      try {
        await translate(text, { to: language });
      } catch {
        return null;
      }
    })();

    if (!response)
      return await interaction.reply({
        content: translateLocale.invalidLanguage,
        ephemeral: true
      });

    await interaction.deferReply();

    const embed = new EmbedBuilder()
      .setColor(client.env.BOT_COLOR)
      .setTitle(translateLocale.textIn(language))
      .setDescription(response.text)
      .addFields([
        {
          name: translateLocale.origLang,
          value: response.from.language.iso,
          inline: true
        },
        {
          name: translateLocale.origMessage,
          value: text,
          inline: true
        }
      ])
      .setTimestamp();

    return await interaction.followUp({ embeds: [embed] });
  }
};
