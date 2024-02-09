import { Command } from "../../interfaces/index.js";
import getLocale from "../../locales/index.js";

export const command: Command = {
  name: "kick",
  description: "Kick the user",
  options: [
    {
      name: "user",
      description: "User to be kicked",
      type: 6,
      required: true
    },
    {
      name: "reason",
      description: "Reason to be shown",
      type: 3,
      required: false
    }
  ],
  guildsOnly: true,
  run: async (client, interaction) => {
    const member = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason", false);
    const userMember = interaction.guild.members.cache.get(interaction.user.id);

    const { kickLocale } = await getLocale(interaction.guildId);

    if (
      !userMember.permissions.has("Administrator") &&
      !userMember.permissions.has("KickMembers")
    )
      return await interaction.reply({
        content: kickLocale.noPermission,
        ephemeral: true
      });

    const target = interaction.guild.members.cache.get(member.id);

    if (target.roles.highest.position >= userMember.roles.highest.position)
      return await interaction.reply({
        content: kickLocale.lowerRole,
        ephemeral: true
      });

    target
      .kick(reason)
      .then(async () => {
        await interaction.deferReply();

        return await interaction.followUp(kickLocale.success(member.id));
      })
      .catch(async () => {
        return await interaction.reply({
          content: kickLocale.failure(member.id),
          ephemeral: true
        });
      });
  }
};
