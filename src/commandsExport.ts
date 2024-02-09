import { readdir } from "fs/promises";
import { Command } from "./Interfaces/index.js";

(async () => {
  const cmdsJson = await Promise.all(
    (await readdir("dist/Commands")).map(async (dir) => {
      const commands = await Promise.all(
        (await readdir(`dist/Commands/${dir}`)).filter((file) =>
          file.endsWith(".js")
        )
      );

      return (
        await Promise.all(
          commands.map(async (file) => {
            const { command } = (await import(
              `${__dirname}/Commands/${dir}/${file}`
            )) as { command: Command };

            return {
              name: command.name,
              description: command.description,
              options: command?.options
            };
          })
        )
      ).sort((a, b) => a.name.localeCompare(b.name));
    })
  );

  console.log(JSON.stringify([].concat(...cmdsJson)));
})();
