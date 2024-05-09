import { Guild, PrismaClient } from "../../prisma/client/index.js";

const prisma = new PrismaClient();

export const createGuild = async (id: string) =>
  await prisma.guild.create({
    data: { id: id, lang: "en", queue: [] }
  });

export const updateGuild = async (guild: Guild) =>
  await prisma.guild.update({
    where: {
      id: guild.id
    },
    data: guild
  });

export const getGuild = async (id: string) =>
  await prisma.guild.findUnique({
    where: {
      id: id
    }
  });

export const deleteGuild = async (id: string) =>
  await prisma.guild.delete({
    where: {
      id: id
    }
  });
