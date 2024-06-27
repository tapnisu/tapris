import type { Component } from "#interfaces/index.js";

export const button: Component = {
  customId: /delete_message/,
  run: async (_client, interaction) => {
    return interaction.message.delete();
  }
};
