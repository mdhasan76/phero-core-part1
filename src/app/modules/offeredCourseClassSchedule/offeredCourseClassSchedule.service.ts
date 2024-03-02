import { OfferedCourseClassSchedule, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { hasTimeConflict } from '../../../shared/utils';
import {
  OfferedCourseClassScheduleRelationalFields,
  OfferedCourseClassScheduleRelationalFieldsMapper,
} from './offeredCourseClassSchedule.constant';
import { checkFacultyAvailable } from './offeredCourseClassSchedule.utils';

const insertToDB = async (data: OfferedCourseClassSchedule) => {
  await checkFacultyAvailable(data);
  const alreadyBookedOnDay = await prisma.offeredCourseClassSchedule.findMany({
    where: {
      dayOfWeek: data.dayOfWeek,
      room: {
        id: data.roomId,
      },
    },
  });

  const existingSlots = alreadyBookedOnDay.map(el => ({
    dayOfWeek: el.dayOfWeek,
    startTime: el.startTime,
    endTime: el.endTime,
  }));
  const newSlot = {
    dayOfWeek: data.dayOfWeek,
    startTime: data.startTime,
    endTime: data.endTime,
  };

  const hasConflict = hasTimeConflict(existingSlots, newSlot);
  if (hasConflict) {
    throw new ApiError(httpStatus.CONFLICT, 'Room already booked!');
  }

  const result = await prisma.offeredCourseClassSchedule.create({
    data,
    include: {
      semesterRegistration: true,
      offeredCourseSection: true,
      room: true,
      faculty: true,
    },
  });
  return result;
};

const getAllFromDB = async (
  filters: any,
  options: IPaginationOptions
): Promise<IGenericResponse<OfferedCourseClassSchedule[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      OR: ['dayOfWeek'].map(el => ({
        [el]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map(field => {
        if (OfferedCourseClassScheduleRelationalFields.includes(field)) {
          return {
            [OfferedCourseClassScheduleRelationalFieldsMapper[field]]: {
              id: filterData as any,
            },
          };
        } else {
          return {
            [field]: {
              equals: (filterData as any)[field],
            },
          };
        }
      }),
    });
  }

  const whereCondition: Prisma.OfferedCourseClassScheduleWhereInput =
    andCondition.length ? { AND: andCondition } : {};
  const result = await prisma.offeredCourseClassSchedule.findMany({
    where: whereCondition,
    include: {
      faculty: true,
      offeredCourseSection: true,
      room: true,
      semesterRegistration: true,
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy as any]: options.sortOrder,
          }
        : { createdAt: 'desc' },
  });
  const total = await prisma.offeredCourseClassSchedule.count();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const OfferedCourseClassScheduleService = { insertToDB, getAllFromDB };
