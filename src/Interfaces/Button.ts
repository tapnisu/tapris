import { ButtonInteraction } from "discord.js";
import Client from "../Core";

interface Run {
	(client: Client, interaction: ButtonInteraction);
}

export interface Button {
	customId: RegExp;
	run: Run;
}
