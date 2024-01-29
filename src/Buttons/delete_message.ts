import { Button } from "../Interfaces";

export const button: Button = {
  customId: /delete_message/,
  run: async (_client, interaction) => {
    return interaction.message.delete();
  }
};
