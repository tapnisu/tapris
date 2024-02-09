import Client from "#core/index.js";
import { ClientEvents } from "discord.js";

type ArgsKeys = keyof ClientEvents;
type Args = ClientEvents[ArgsKeys];

interface Run {
  (client: Client, ...args: Args);
}

export interface Event {
  name: keyof ClientEvents;
  disabled?: boolean;
  run: Run;
}
