import Client from "../Core";
import { ChatInputCommandInteraction } from "discord.js";

interface Run {
	(client: Client, interaction: ChatInputCommandInteraction);
}

export interface Command {
	name: string;
	description?: string;
	options?: any[];
	run: Run;
}
