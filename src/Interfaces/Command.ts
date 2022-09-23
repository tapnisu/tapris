import Client from "@Core/index";
import { ChatInputCommandInteraction } from "discord.js";

interface Run {
	(client: Client, interaction: ChatInputCommandInteraction);
}

export interface Command {
	name: string;
	description?: string;
	options?: any[];
	guildsOnly?: boolean;
	run: Run;
}
