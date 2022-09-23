import Client from "@Core/index";
import { ClientEvents } from "discord.js";

interface Run {
	(client: Client, ...args: any[]);
}

export interface Event {
	name: keyof ClientEvents;
	run: Run;
}
