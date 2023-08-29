/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcademicDepartment, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IAcademicDepartmentFilters } from './academicDepartment.interface';

const insertToDB = async (
  academicDepartmentData: AcademicDepartment
): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.create({
    data: academicDepartmentData,
  });
  return result;
};

const getDataById = async (
  academicDepartmentId: string
): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.findUnique({
    where: {
      id: academicDepartmentId,
    },
  });
  return result;
};

const getAllFromDB = async (
  filters: IAcademicDepartmentFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicDepartment[]>> => {
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

  const whereCondition: Prisma.AcademicDepartmentWhereInput =
    andCondition.length ? { AND: andCondition } : {};
  const result = await prisma.academicDepartment.findMany({
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
  const total = await prisma.academicDepartment.count();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicDepartmentService = {
  insertToDB,
  getAllFromDB,
  getDataById,
};
