import { Building } from '@prisma/client';
import prisma from '../../../shared/prisma';
const insertToDB = async (
  academicSemesterData: Building
): Promise<Building[]> => {
  // console.log()
  const result = await prisma.building.findMany({});
  return result;
};
export const BuildingService = { insertToDB };
