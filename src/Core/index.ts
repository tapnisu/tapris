import { Client, ClientOptions, Collection, IntentsBitField } from "discord.js";
import { readdirSync } from "fs";
import { Button, Command, Env, Event } from "../Interfaces/index.js";
import env from "./env.js";

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
        // IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildModeration,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildPresences
      ]
    }
  ) {
    super(options);

    this.token = this.env.TOKEN;

    // Set commands to the bot
    readdirSync("dist/Commands").map(async (dir) => {
      const commands = readdirSync(`dist/Commands/${dir}`).filter((file) =>
        file.endsWith(".js")
      );

      for (const file of commands) {
        const { command } = (await import(`../Commands/${dir}/${file}`)) as {
          command: Command;
        };

        if (!command.disabled) this.commands.set(command.name, command);
      }
    });

    // Set events to the bot
    readdirSync("dist/Events")
      .filter((file) => file.endsWith(".js"))
      .map(async (file) => {
        const { event } = (await import(`../Events/${file}`)) as {
          event: Event;
        };

        if (event.disabled) return;

        this.events.set(event.name, event);
        this.on(event.name, event.run.bind(null, this));
      });

    // Set buttons to the bot
    readdirSync("dist/Buttons")
      .filter((file) => file.endsWith(".js"))
      .map(async (file) => {
        const { button } = await import(`../Buttons/${file}`);

        this.buttons.set(button.customId, button);
      });
  }
}

export default ExtendedClient;
