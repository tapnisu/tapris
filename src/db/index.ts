import { Guild, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createGuild = async (id: string) => {
  const guild = await prisma.guild.create({
    data: { id: id, lang: "en", queue: [] }
  });

  await prisma.$disconnect();

  return guild;
};

export const updateGuild = async (guild: Guild) => {
  await prisma.guild.update({
    where: {
      id: guild.id
    },
    data: guild
  });

  await prisma.$disconnect();
};

export const getGuild = async (id: string) => {
  const guild = await prisma.guild.findUnique({
    where: {
      id: id
    }
  });

  await prisma.$disconnect();

  return guild;
};

export const deleteGuild = async (id: string) => {
  await prisma.guild.delete({
    where: {
      id: id
    }
  });

  await prisma.$disconnect();
};
