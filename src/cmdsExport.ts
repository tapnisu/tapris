import { readdirSync } from "fs";
import { Command } from "./Interfaces";

(async () => {
	const cmdsJson = await Promise.all(
		readdirSync("dist/Commands").map(async (dir) => {
			const commands = await Promise.all(
				readdirSync(`dist/Commands/${dir}`).filter((file) =>
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
			).sort((a, b) => {
				if (a.name > b.name) {
					return 1;
				}
				if (a.name < b.name) {
					return -1;
				}
				return 0;
			});
		})
	);

	console.log(JSON.stringify([].concat(...cmdsJson)));
})();
