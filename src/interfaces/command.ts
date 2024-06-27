import Client from "#core/index.js";
import type {
  ApplicationCommandOption,
  ChatInputCommandInteraction,
  InteractionResponse,
  Message
} from "discord.js";
import type { I18n } from "i18n";

interface Run {
  (
    client: Client,
    interaction: ChatInputCommandInteraction,
    i18n: I18n
  ): Promise<Message<boolean> | InteractionResponse<boolean>>;
}

type ApplicationCommandOptionExtended = ApplicationCommandOption & {
  required: boolean;
};

export interface Command {
  name: string;
  description?: string;
  options?: ApplicationCommandOptionExtended[];
  guildsOnly?: boolean;
  disabled?: boolean;
  run: Run;
}
