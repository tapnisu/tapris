import {
	ApplicationCommandOption,
	ChatInputCommandInteraction
} from "discord.js";
import Client from "../Core";

interface Run {
	(client: Client, interaction: ChatInputCommandInteraction): Promise<any>;
}

export interface Command {
	name: string;
	description?: string;
	options?: ApplicationCommandOption[];
	guildsOnly?: boolean;
	run: Run;
}
