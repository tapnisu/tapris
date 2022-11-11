import {
	ApplicationCommandOption,
	ChatInputCommandInteraction,
	InteractionResponse,
	Message
} from "discord.js";
import Client from "../Core";

interface Run {
	(client: Client, interaction: ChatInputCommandInteraction): Promise<
		Message<boolean> | InteractionResponse<boolean>
	>;
}

type ApplicationCommandOptionExtended = ApplicationCommandOption & {
	required: boolean;
};

export interface Command {
	name: string;
	description?: string;
	options?: ApplicationCommandOptionExtended[];
	guildsOnly?: boolean;
	run: Run;
}
