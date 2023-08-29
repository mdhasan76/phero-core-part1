/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcademicFaculty, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IAcademicFilters } from './academicFaculty.interface';

const insertToDB = async (
  academicFacultyData: AcademicFaculty
): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.create({
    data: academicFacultyData,
  });
  return result;
};

const getDataById = async (
  academicFacultyId: string
): Promise<AcademicFaculty | null> => {
  const result = await prisma.academicFaculty.findUnique({
    where: {
      id: academicFacultyId,
    },
  });
  return result;
};

const getAllFromDB = async (
  filters: IAcademicFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicFaculty[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      OR: ['title'].map(el => ({
        [el]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map(field => ({
        [field]: {
          equals: (filterData as any)[field],
        },
      })),
    });
  }

  const whereCondition: Prisma.AcademicFacultyWhereInput = andCondition.length
    ? { AND: andCondition }
    : {};
  const result = await prisma.academicFaculty.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy as any]: options.sortOrder,
          }
        : { createdAt: 'desc' },
  });
  const total = await prisma.academicFaculty.count();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicFacultyService = {
  insertToDB,
  getAllFromDB,
  getDataById,
};
