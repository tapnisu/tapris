import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	ColorResolvable,
	EmbedBuilder
} from "discord.js";

export const choices = ["сoin", "tail"];

export const flipCoin = (choices: string[]) => {
	return choices[Math.floor(Math.random() * choices.length)];
};

export class CoinEmbedBuilder {
	constructor(
		winner: string,
		choice: string,
		choices: string[],
		embedColor: ColorResolvable
	) {
		return new EmbedBuilder()
			.setTitle(`${winner == choices[0] ? choices[0] : choices[1]} won!`)
			.setColor(embedColor)
			.setDescription(
				`${winner.toLocaleLowerCase() == choice ? "You won!" : "You lost!"}`
			);
	}
}

export class CoinButtonsRowBuilder extends ActionRowBuilder<ButtonBuilder> {
	constructor(choices: string[]) {
		super();

		this.addComponents([
			new ButtonBuilder()
				.setCustomId(`flip_coin_${choices[0]}`)
				.setLabel(`Select ${choices[0]}`)
				.setStyle(ButtonStyle.Primary),
			new ButtonBuilder()
				.setCustomId(`flip_coin_${choices[1]}`)
				.setLabel(`Select ${choices[1]}`)
				.setStyle(ButtonStyle.Primary)
		]);
	}
}
