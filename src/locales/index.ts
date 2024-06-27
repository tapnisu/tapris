import { getGuild } from "#db/index.js";
import * as enLocale from "./en/index.js";
import * as ruLocale from "./ru/index.js";

/**
 * Get locale for selected guild from `src/locales/[lang]/index.ts`
 * @param guildId guild to get locale for
 * @returns locale
 * @deprecated use i18n based localization instead
 */
export default async function getLocale(guildId: string) {
  if (!guildId) return enLocale;

  const guild = await getGuild(guildId);

  return (guild.lang == "en" ? enLocale : ruLocale) as typeof enLocale;
}
