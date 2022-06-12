import Client from "../Core";
import { CommandInteraction } from "discord.js";

interface Run {
	(client: Client, interaction: CommandInteraction);
}

export interface Command {
	name: string;
	description?: string;
	options?: any[];
	run: Run;
}
