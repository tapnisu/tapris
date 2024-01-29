import { getGuild } from "../db";
import * as enLocale from "./en";
import * as ruLocale from "./ru";

export default async function getLocale(guildId: string) {
  if (!guildId) return enLocale;

  const guild = await getGuild(guildId).catch();

  return (guild.lang == "en" ? enLocale : ruLocale) as typeof enLocale;
}
