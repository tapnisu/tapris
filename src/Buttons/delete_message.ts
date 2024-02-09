import { Button } from "../Interfaces/index.js";

export const button: Button = {
  customId: /delete_message/,
  run: async (_client, interaction) => {
    return interaction.message.delete();
  }
};
