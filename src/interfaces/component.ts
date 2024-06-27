import Client from "#core/index.js";
import type { ButtonInteraction } from "discord.js";
import type { I18n } from "i18n";

interface Run {
  (client: Client, interaction: ButtonInteraction, i18n: I18n);
}

export interface Component {
  customId: RegExp;
  run: Run;
}
