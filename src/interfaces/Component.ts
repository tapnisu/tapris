import Client from "#core/index.js";
import { ButtonInteraction } from "discord.js";

interface Run {
  (client: Client, interaction: ButtonInteraction);
}

export interface Component {
  customId: RegExp;
  run: Run;
}
