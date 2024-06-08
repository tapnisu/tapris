import Client from "#core/index.js";
import { ButtonInteraction } from "discord.js";
import { I18n } from "i18n";

interface Run {

    (client: Client, interaction: ButtonInteraction, i18n: I18n);
}

export interface Component {
  customId: RegExp;
  run: Run;
}
