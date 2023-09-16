import { Building } from '@prisma/client';
import prisma from '../../../shared/prisma';

// insert new data
const insertToDB = async (
  academicSemesterData: Building
): Promise<Building | null> => {
  // console.log()
  const result = await prisma.building.create({ data: academicSemesterData });
  return result;
};

// get all data from db
const getAllFromDB = async (): Promise<Building[]> => {
  const result = await prisma.building.findMany({});
  return result;
};
export const BuildingService = { insertToDB, getAllFromDB };
