import axios from "axios";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} from "discord.js";
import { AshconResponse } from "../../Interfaces/Ashcon.js";
import { Command } from "../../Interfaces/index.js";
import getLocale from "../../Locales/index.js";

export const command: Command = {
  name: "mineskin",
  description: "Get minecraft skin & UUID",
  options: [
    {
      name: "user",
      description: "Username of the user to be shown",
      type: 3,
      required: true
    }
  ],
  disabled: true,
  run: async (client, interaction) => {
    const nickname = interaction.options.getString("user");
    const { mineskinLocale } = await getLocale(interaction.guildId);

    let response: AshconResponse;

    await interaction.deferReply();

    try {
      response = (
        await axios.get(
          `https://api.ashcon.app/mojang/v2/user/${encodeURI(nickname)}`
        )
      ).data;
    } catch {
      return await interaction.followUp({
        content: mineskinLocale.notFound
      });
    }

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents([
      new ButtonBuilder()
        .setURL(response.textures.skin.url)
        .setLabel(mineskinLocale.originalImage)
        .setStyle(ButtonStyle.Link)
    ]);

    const Embed = new EmbedBuilder()
      .setColor(client.env.BOT_COLOR)
      .setTitle(response.username)
      .setDescription(mineskinLocale.uuid(response.uuid))
      .setThumbnail(
        `https://crafatar.com/renders/head/${response.uuid}?overlay`
      )
      .setImage(`https://crafatar.com/renders/body/${response.uuid}?overlay`)
      .setURL(response.textures.skin.url);

    return await interaction.followUp({ embeds: [Embed], components: [row] });
  }
};
