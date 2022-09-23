import { getGuild } from "@db/index";
import * as enLocale from "./en";

const getLocale = async (guildId: string) => {
	if (!guildId) return enLocale;

	const guild = await getGuild(guildId).catch();

	return (await import(`./${guild.lang}`)) as typeof enLocale;
};

export default getLocale;
