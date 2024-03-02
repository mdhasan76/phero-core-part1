import { Room } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertToDB = async (data: Room) => {
  const result = await prisma.room.create({
    data,
  });
  return result;
};

export const RoomService = { insertToDB };
