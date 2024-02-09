import { EmbedBuilder } from "discord.js";
import { getGuild, updateGuild } from "../../db.js";
import { Command } from "../../interfaces/index.js";
import getLocale from "../../locales/index.js";

export const command: Command = {
  name: "changelang",
  description: "Change language for the bot",
  options: [
    {
      name: "lang",
      description: "Lang that I will use",
      choices: [
        { name: "Russian", value: "ru" },
        { name: "English", value: "en" }
      ],
      type: 3,
      required: true
    }
  ],
  guildsOnly: true,
  run: async (client, interaction) => {
    const { changelangLocale } = await getLocale(interaction.guildId);

    const userMember = interaction.guild.members.cache.get(interaction.user.id);
    if (!userMember.permissions.has("Administrator"))
      return await interaction.reply({
        content: changelangLocale.notAdministrator(),
        ephemeral: true
      });

    await interaction.deferReply();

    const lang = interaction.options.getString("lang");
    const guild = await getGuild(interaction.guildId);
    guild.lang = lang;
    await updateGuild(guild);

    const embed = new EmbedBuilder()
      .setColor(client.env.BOT_COLOR)
      .setTitle(changelangLocale.success(guild.lang));

    return await interaction.followUp({
      embeds: [embed]
    });
  }
};
