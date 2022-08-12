import { getGuild } from "../db";
import * as localesTypes from "./en";

const getLocale = async (guildId: string) => {
	const guild = await getGuild(guildId);

	return (await import(`./${guild.lang}`)) as typeof localesTypes;
};

export default getLocale;
