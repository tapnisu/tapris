import { ApplicationCommand, Client, REST, Routes } from "discord.js";
import config from "./Core/env.js";

console.warn("Use https://github.com/tapris-bot/dsc-commands-remover instead");

const rest = new REST({ version: "10" }).setToken(config.TOKEN);
const client = new Client({
  intents: []
});
await client.login(config.TOKEN);

const commands = (await rest.get(
  Routes.applicationCommands(client.user.id)
)) as unknown[];

await Promise.all(
  commands.map((command: ApplicationCommand) =>
    rest
      .delete(Routes.applicationCommand(client.user.id, command.id))
      .then(() =>
        console.log(`Successfully deleted application command ${command.name}`)
      )
      .catch(console.error)
  )
);

await client.destroy();
