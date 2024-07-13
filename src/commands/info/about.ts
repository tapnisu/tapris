import type { Command } from "#interfaces/index.js";
import { EmbedBuilder } from "discord.js";

export const command: Command = {
  name: "about",
  description: "Learn more about me",
  run: async (client, interaction, i18n) => {
    await interaction.deferReply();

    const embed = new EmbedBuilder()
      .setColor(client.env.BOT_COLOR)
      .setTitle(interaction.guild.name)
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(i18n.__("about_description"))
      .addFields([
        {
          name: i18n.__("about_amountOfGuilds"),
          value: (await client.shard.fetchClientValues("guilds.cache.size"))
            .reduce((acc: number, guildCount: number) => acc + guildCount, 0)
            .toString(),
          inline: true
        },
        {
          name: i18n.__("about_amountOfCommands"),
          value: client.commands.size.toString(),
          inline: true
        }
      ]);

    return await interaction.followUp({ embeds: [embed] });
  }
};
