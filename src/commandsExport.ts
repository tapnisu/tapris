import { readdir } from "fs/promises";
import prettier from "prettier";
import { Command } from "./Interfaces/index.js";

const commandsDirs = await readdir("dist/Commands");

const commandsJson = await Promise.all(
  commandsDirs.map(async (dir) => {
    const commandsFiles = (await readdir(`dist/Commands/${dir}`)).filter(
      (file) => file.endsWith(".js")
    );

    const commands = await Promise.all(
      commandsFiles.map(async (file) => {
        const { command } = (await import(`./Commands/${dir}/${file}`)) as {
          command: Command;
        };

        return {
          name: command.name,
          description: command.description,
          options: command.options,
          disabled: command.disabled
        };
      })
    );

    return commands
      .filter((c) => !c.disabled)
      .sort((a, b) => a.name.localeCompare(b.name));
  })
);

const rawJson = JSON.stringify([].concat(...commandsJson));
const prettierJson = await prettier.format(rawJson, { parser: "json" });

console.log(prettierJson);
