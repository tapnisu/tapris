import { Command } from "#interfaces/index.js";
import { createCanvas } from "@napi-rs/canvas";
import { AttachmentBuilder, ColorResolvable, EmbedBuilder } from "discord.js";

export const command: Command = {
  name: "color",
  description: "Shows color or generates color",
  options: [
    {
      name: "color",
      description: "Color to be shown",
      type: 3,
      required: false
    }
  ],
  run: async (client, interaction) => {
    await interaction.deferReply();

    let colorString = interaction.options.getString("color");

    if (!colorString) {
      const hexCharset = "ABCDEF0123456789";

      colorString = "#";

      for (let i = 0, n = hexCharset.length; i < 6; ++i) {
        colorString += hexCharset.charAt(Math.floor(Math.random() * n));
      }
    }

    const canvas = createCanvas(500, 500);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = colorString;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "50px JetBrains Mono";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(colorString, 250, 200);
    ctx.font = "50px JetBrains Mono";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.fillText(colorString, 250, 350);

    const attachment = new AttachmentBuilder(canvas.toBuffer("image/webp"), {
      name: "ColorHexSend.png"
    });

    const embed = new EmbedBuilder()
      .setTitle(colorString)
      .setImage("attachment://ColorHexSend.png");

    try {
      embed.setColor(colorString as ColorResolvable);
    } catch {
      embed.setColor(client.env.BOT_COLOR);
    }

    return await interaction.followUp({ embeds: [embed], files: [attachment] });
  }
};
