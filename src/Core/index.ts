import { Client, ClientOptions, Collection, IntentsBitField } from "discord.js";
import { readdirSync } from "fs";
import { Button, Command, Env, Event } from "../Interfaces";
import env from "./env";

class ExtendedClient extends Client {
  public events: Collection<string, Event> = new Collection();
  public commands: Collection<string, Command> = new Collection();
  public buttons: Collection<string, Button> = new Collection();
  public env: Env = env as unknown as Env;

  constructor(
    options: ClientOptions = {
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildBans,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildPresences
      ]
    }
  ) {
    super(options);
  }

  public async init() {
    await this.login(this.env.TOKEN);

    // Set commands to the bot
    readdirSync("dist/Commands").forEach(async (dir) => {
      const commands = readdirSync(`dist/Commands/${dir}`).filter((file) =>
        file.endsWith(".js")
      );

      for (const file of commands) {
        const { command } = await import(
          `${__dirname}/../Commands/${dir}/${file}`
        );

        this.commands.set(command.name, command);
      }
    });

    // Set events to the bot
    readdirSync("dist/Events")
      .filter((file) => file.endsWith(".js"))
      .forEach(async (file) => {
        const { event } = await import(`../Events/${file}`);
        this.events.set(event.name, event);
        this.on(event.name, event.run.bind(null, this));
      });

    // Set buttons to the bot
    readdirSync("dist/Buttons")
      .filter((file) => file.endsWith(".js"))
      .forEach(async (file) => {
        const { button } = await import(`${__dirname}/../Buttons/${file}`);

        this.buttons.set(button.customId, button);
      });
  }
}

export default ExtendedClient;
