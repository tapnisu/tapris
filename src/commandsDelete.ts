import { type ApplicationCommand, Client, REST, Routes } from "discord.js";
import config from "#core/env.js";

console.warn("Use https://github.com/tapnisu/dsc-commands-remover instead");

const rest = new REST({ version: "10" }).setToken(config.TAPRIS_TOKEN);
const client = new Client({
  intents: []
});
await client.login(config.TAPRIS_TOKEN);

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
