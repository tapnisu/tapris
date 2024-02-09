import { getGuild } from "../db.js";
import * as enLocale from "./en/index.js";
import * as ruLocale from "./ru/index.js";

export default async function getLocale(guildId: string) {
  if (!guildId) return enLocale;

  const guild = await getGuild(guildId).catch();

  return (guild.lang == "en" ? enLocale : ruLocale) as typeof enLocale;
}
