import { type Guild, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createGuild(id: string) {
  return await prisma.guild.create({
    data: { id: id, lang: "en" }
  });
}

export async function updateGuild(guild: Guild) {
  return await prisma.guild.update({
    where: {
      id: guild.id
    },
    data: guild
  });
}

export async function getGuild(id: string) {
  return await prisma.guild.findUnique({
    where: {
      id: id
    }
  });
}

export async function deleteGuild(id: string) {
  return await prisma.guild.delete({
    where: {
      id: id
    }
  });
}
