import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} from "discord.js";

import { Command } from "#interfaces/index.js";
import getLocale from "#locales/index.js";

export const command: Command = {
  name: "avatar",
  description: "Get someones avatar",
  options: [
    {
      name: "user",
      description: "User to get avatar from",
      type: 6,
      required: true
    }
  ],
  run: async (client, interaction) => {
    await interaction.deferReply();
    const { avatarLocale } = await getLocale(interaction.guildId);

    const user = interaction.options.getUser("user");
    const avatarUrl = user.displayAvatarURL();

    const Embed = new EmbedBuilder()
      .setColor(client.env.BOT_COLOR)
      .setAuthor({
        iconURL: avatarUrl,
        name: avatarLocale.userAvatar(user.tag)
      })
      .setImage(avatarUrl);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents([
      new ButtonBuilder()
        .setURL(avatarUrl)
        .setLabel(avatarLocale.avatarLink)
        .setStyle(ButtonStyle.Link)
    ]);

    return await interaction.followUp({ embeds: [Embed], components: [row] });
  }
};
