import { readdirSync } from "fs";

(async () => {
	const cmdsJson = await Promise.all(
		readdirSync("dist/Commands").map(async (dir) => {
			const commands = await Promise.all(
				readdirSync(`dist/Commands/${dir}`).filter((file) =>
					file.endsWith(".js")
				)
			);

			return await Promise.all(
				commands.map(async (file) => {
					const { command } = await import(
						`${__dirname}/Commands/${dir}/${file}`
					);

					return {
						name: command.name,
						description: command.description,
						options: command?.options
					};
				})
			);
		})
	);

	console.log(JSON.stringify([].concat(...cmdsJson)));
})();
