import { Button } from "../interfaces/index.js";

export const button: Button = {
  customId: /delete_message/,
  run: async (_client, interaction) => {
    return interaction.message.delete();
  }
};
