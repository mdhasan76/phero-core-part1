import { OfferedCourseSection } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const insertToDB = async (data: OfferedCourseSection) => {
  const isExistOfferedCourse = await prisma.offeredCourse.findFirst({
    where: {
      id: data.offeredCourseId,
    },
  });
  if (!isExistOfferedCourse) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Offered course does not exist');
  }
  const result = await prisma.offeredCourseSection.create({
    data,
    include: {
      semesterRegistration: true,
      offeredCourse: true,
    },
  });
  return result;
};

export const OfferedCourseSectionService = { insertToDB };
