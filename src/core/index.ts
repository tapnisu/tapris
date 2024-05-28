import { Client, ClientOptions, Collection, IntentsBitField } from "discord.js";
import { readdirSync } from "fs";
import { Command, Component, Env, Event } from "#interfaces/index.js";
import { I18n } from "i18n";
import env from "./env.js";

class ExtendedClient extends Client {
  public events: Collection<string, Event> = new Collection();
  public commands: Collection<string, Command> = new Collection();
  public components: Collection<string, Component> = new Collection();
  public env: Env = env as unknown as Env;
  public i18n = new I18n({
    defaultLocale: "en",
    locales: ["en", "ru"],
    directory: "locales"
  });

  constructor(
    options: ClientOptions = {
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.GuildModeration,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildPresences
      ]
    }
  ) {
    super(options);

    this.token = this.env.TAPRIS_TOKEN;

    // Set commands to the bot
    readdirSync("dist/commands").map(async (dir) => {
      const commands = readdirSync(`dist/commands/${dir}`).filter((file) =>
        file.endsWith(".js")
      );

      for (const file of commands) {
        const { command } = (await import(`../commands/${dir}/${file}`)) as {
          command: Command;
        };

        if (!command.disabled) this.commands.set(command.name, command);
      }
    });

    // Set events to the bot
    readdirSync("dist/events")
      .filter((file) => file.endsWith(".js"))
      .map(async (file) => {
        const { event } = (await import(`../events/${file}`)) as {
          event: Event;
        };

        if (event.disabled) return;

        this.events.set(event.name, event);
        this.on(event.name, event.run.bind(null, this));
      });

    // Set buttons to the bot
    readdirSync("dist/components")
      .filter((file) => file.endsWith(".js"))
      .map(async (file) => {
        const { button } = await import(`../components/${file}`);

        this.components.set(button.customId, button);
      });
  }
}

export default ExtendedClient;
