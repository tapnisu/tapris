import { ButtonInteraction } from "discord.js";
import Client from "../core/index.js";

interface Run {
  (client: Client, interaction: ButtonInteraction);
}

export interface Component {
  customId: RegExp;
  run: Run;
}
