import { createCanvas } from "canvas";
import { AttachmentBuilder, ColorResolvable, EmbedBuilder } from "discord.js";
import { Command } from "../../Interfaces";

export const command: Command = {
	name: "colour",
	description: "Shows colour or generates colour",
	options: [
		{
			name: "colour",
			description: "colour to be shown",
			type: 3,
			required: false
		}
	],
	run: async (client, interaction) => {
		await interaction.deferReply();

		let colourString = interaction.options.getString("colour");

		if (!colourString) {
			const hexCharset = "ABCDEF0123456789";

			colourString = "#";

			for (let i = 0, n = hexCharset.length; i < 6; ++i) {
				colourString += hexCharset.charAt(Math.floor(Math.random() * n));
			}
		}

		const canvas = createCanvas(500, 500);
		const ctx = canvas.getContext("2d");

		ctx.fillStyle = colourString;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.font = "50px JetBrains Mono";
		ctx.fillStyle = "#ffffff";
		ctx.textAlign = "center";
		ctx.fillText(colourString, 250, 200);
		ctx.font = "50px JetBrains Mono";
		ctx.fillStyle = "#000000";
		ctx.textAlign = "center";
		ctx.fillText(colourString, 250, 350);

		const attachment = new AttachmentBuilder(canvas.toBuffer(), {
			name: "colourHexSend.png"
		});

		const Embed = new EmbedBuilder()
			.setTitle(colourString)
			.setImage("attachment://colourHexSend.png");

		try {
			Embed.setColor(colourString as ColorResolvable);
		} catch {
			Embed.setColor(client.env.BOT_COLOR);
		}

		return await interaction.followUp({ embeds: [Embed], files: [attachment] });
	}
};
